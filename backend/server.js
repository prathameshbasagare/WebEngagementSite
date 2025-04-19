import express from 'express';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Action from './event.js';
import Company from './company.js';

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
const getAnalytics = async (req, res) => {
    try {
        const actionsByType = await Action.aggregate([
            { $group: { _id: "$actionType", count: { $sum: 1 } } },
        ]);

        const actionsOverTime = await Action.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
                    count: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]);

        const mostActivePages = await Action.aggregate([
            { $group: { _id: "$pageUrl", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]);

        res.status(200).json({ actionsByType, actionsOverTime, mostActivePages });
    } catch (error) {
        res.status(500).json({ message: "Error fetching analytics", error });
    }
};
app.post('/track-event', async (req, res) => {
    console.log(req.body)
    const { actionType,companyID, pageUrl, metadata } = req.body;

    try {
        const existingAction = await Action.findOne({ actionType, pageUrl });
        const existingCompany = await Company.findOne({companyname : companyID.toLowerCase()});
        
        if (existingAction && existingCompany) {
            existingAction.counter += 1;
            existingAction.timestamp = new Date();
            await existingAction.save();
            res.status(200).json({ message: 'Action updated successfully', action: existingAction });
        } else if(existingCompany) {
            const newAction = new Action({  actionType,companyID, pageUrl, metadata, counter: 1, timestamp: new Date() });
            await newAction.save();
            res.status(201).json({ message: 'Action created successfully', action: newAction });
        }else{
            res.status(500).json({ message: 'Please Sign up first on Our Portal' });
        }
    } catch (error) {
        console.error('Error tracking action:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/signup', async (req, res) => {
    const { name, email, password, companyname } = req.body; // Add companyname here

    // Validate companyname
    if (!companyname) {
        return res.status(400).json({ error: 'Company name is required' });
    }

    // Validate name
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

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
            name,
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
    const { userId } = req.query; // Currently Company name is being passed as userId
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
  
  //4.
  
  
  


app.get("/", (req, res)=>{
    res.send("Hi, this is root page");
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
