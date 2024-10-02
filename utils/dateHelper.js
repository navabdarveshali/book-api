const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};

const formatDate = (date) => {
    return date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
};

const isOverdue = (dueDate) => {
    const today = new Date();
    return new Date(dueDate) < today;
};

module.exports = {
    addDays,
    formatDate,
    isOverdue
};
