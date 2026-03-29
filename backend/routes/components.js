const express = require('express');
const router = express.Router();
const Component = require('../models/Component');
const { calculateMaintenanceStatus } = require('../utils/aiPredictor');

// Add a new component (Activity Diagram Step 5[cite: 1])
router.post('/add', async (req, res) => {
    try {
        const { userId, name, manufactureDate, startUseDate, expectedLifespanDays = 365 } = req.body;
        
        // Run prediction logic
        const { predictedDate, status } = calculateMaintenanceStatus(startUseDate, expectedLifespanDays);

        const newComponent = new Component({
            userId,
            name,
            manufactureDate,
            startUseDate,
            expectedLifespanDays,
            predictedMaintenanceDate: predictedDate,
            status
        });

        const savedComponent = await newComponent.save();
        res.status(201).json(savedComponent);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get components for Dashboard (Real-time dynamic calculation)
router.get('/:userId', async (req, res) => {
    try {
        const components = await Component.find({ userId: req.params.userId }).sort({ createdAt: -1 });
        
        const updatedComponents = components.map(comp => {
            // Re-run the AI logic based on today's date for BOTH status and the predicted date
            const { predictedDate, status } = calculateMaintenanceStatus(comp.startUseDate, comp.expectedLifespanDays);
            
            // Return the component with the fresh, real-time status and date
            return { ...comp._doc, status, predictedMaintenanceDate: predictedDate }; 
        });

        res.status(200).json(updatedComponents);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Resolve maintenance (Resets the tracker & recalculates next maintenance)
router.put('/resolve/:id', async (req, res) => {
    try {
        const component = await Component.findById(req.params.id);
        if (!component) {
            return res.status(404).json({ error: 'Component not found' });
        }

        // 1. Reset the start date to today
        component.startUseDate = new Date();
        
        // 2. Recalculate the next maintenance date based on today + lifespan
        const { predictedDate, status } = calculateMaintenanceStatus(component.startUseDate, component.expectedLifespanDays);
        
        // 3. Save the newly calculated date and status to the database
        component.predictedMaintenanceDate = predictedDate;
        component.status = status;
        
        const updatedComponent = await component.save();
        res.status(200).json(updatedComponent);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Delete a component (Admin Only)
router.delete('/:id', async (req, res) => {
    try {
        const component = await Component.findByIdAndDelete(req.params.id);
        if (!component) {
            return res.status(404).json({ error: 'Component not found' });
        }
        res.status(200).json({ message: 'Component deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;