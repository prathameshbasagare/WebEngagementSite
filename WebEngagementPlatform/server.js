import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Action from './event.js';
import Company from './company.js';
import sendMail from './controllers/sendEmail.js';

dotenv.config();

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});


// Regex patterns
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

const formatDatatoSend = (user) => {
    const access_token = jwt.sign({ email: user.email }, process.env.SECRET_ACCESS_KEY);
    return {
        access_token,
        companyname:user.companyname,
        email: user.email,
    };
};

app.post('/signup', async (req, res) => {
    console.log("Hi there!")
    const {  email, password, companyname } = req.body; // Add companyname here

    // Validate companyname
    if (!companyname) {
        return res.status(400).json({ error: 'Company name is required' });
    }

    // Validate name
    // if (!name) {
    //     return res.status(400).json({ error: 'Name is required' });
    // }

    // Validate email
    if (!email) {
        return res.status(400).json({ error: 'Enter the email' });
    }
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Email is invalid' });
    }

    // Validate password
    if (!password) {
        return res.status(400).json({ error: 'Enter the password' });
    }
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: 'Password should be 6 to 20 characters long with a numeric, 1 lowercase, and 1 uppercase' });
    }

    try {
        // Hash the password
        const hashed_password = await bcrypt.hash(password, 10);

        // Create user with companyname
        const user = new Company({
            
            email,
            password: hashed_password,
            companyname // Make sure this field is included
        });

        const savedUser = await user.save();  // Save the user in the database
        res.status(200).json({ message: 'User registered successfully', user: savedUser });
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if user exists
      const user = await Company.findOne({ email }); // Use Company model here
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
    //   console.log(user);
  
      // Verify password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT
      const token = jwt.sign({ id: user._id }, process.env.SECRET_ACCESS_KEY, {
        expiresIn: '1h',
      });
  
      // Respond with user data and token
      res.status(200).json({
        message: 'Login successful',
        token,
        user: { id: user._id, email: user.email, companyname: user.companyname },
      });
      
    } catch (error) {
      console.error('Signin error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // 3
  app.get('/analytics', async (req, res) => {
    
    // const companyName = req.query.companyName;
   
    const { userId } = req.query; 

    console.log(userId);
    try {
        const foundCompany = await Company.findOne({ companyname: userId });
        if (foundCompany) {
            const foundAction = await Action.find({ companyID: userId });
            if (foundAction) {
                // Sending the foundAction array to the frontend as a JSON response
                return res.json(foundAction);
            } else {
                return res.status(404).json({ message: "Actions not found" });
            }
        } else {
            return res.status(404).json({ message: "Company not found" });
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }


    // if (!companyName) {
    //   return res.status(400).json({ message: 'Company name is required' });
    // }
  
    // try {
    //   // Fetch analytics data based on the company name
    //   const analyticsData = await fetchAnalyticsForCompany(companyName);
    //   res.json(analyticsData);  // Send back the data to the frontend
    // } catch (error) {
    //   console.error('Error fetching analytics:', error);
    //   res.status(500).json({ message: 'Error fetching analytics data' });
    // }
  });
  
  app.post('/send-email',async (req,res)=>{
    const { emails, subject, body } = req.body;

    if (!emails || !subject || !body) {
        return res.status(400).send({ message: 'Emails, subject, and body are required' });
    }

    // Array to track results for each email
    const results = [];

    // Send emails to each recipient
    for (const email of emails) {
        try {
            await new Promise((resolve, reject) => {
                sendMail(email, subject, body, (error, info) => {
                    if (error) {
                        results.push({ email, status: 'failed', error: error.message });
                        return reject(error);
                    }
                    results.push({ email, status: 'sent', messageId: info.messageId });
                    resolve(info);
                });
            });
        } catch (error) {
            console.error(`Failed to send email to ${email}:`, error);
        }
    }

    // Return response with results
    res.status(200).send({
        message: 'Emails processed',
        results,
    });
    
    
  });
  
  
  


app.get("/", (req, res)=>{
    res.send("Hi, this is root page");
})

app.listen(3001, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
