const calculateMaintenanceStatus = (startUseDate, expectedLifespanDays) => {
    const start = new Date(startUseDate);
    const predictedDate = new Date(start.setDate(start.getDate() + expectedLifespanDays));
    const today = new Date();
    
    // REMOVED Math.abs() to allow negative numbers for overdue maintenance
    const diffTime = predictedDate - today;
    const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let status = 'Green';
    // If daysRemaining is negative (overdue) or <= 10, it triggers Red[cite: 1]
    if (daysRemaining <= 10) {
        status = 'Red'; 
    } else if (daysRemaining > 10 && daysRemaining <= 25) {
        status = 'Yellow'; 
    } else {
        status = 'Green'; 
    }

    return { predictedDate, status, daysRemaining };
};

module.exports = { calculateMaintenanceStatus };