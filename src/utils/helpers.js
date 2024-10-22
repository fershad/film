export const years = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= 2023; i--) {
        years.push(i.toString());
    }
    return years;
    }

export const months = () => {
    let months = [];
    for (let i = 1; i <= 12; i++) {
        months.push(i);
    }
    return months;
};