export const getColorFromStatus = (status: number): string => {
    switch (status) {
        case 0:
            return 'lightblue';
        case 1:
            return 'red';
        case 2:
            return 'lightgreen';
        case 3:
            return 'lightgreen';
        case 4:
            return 'green';
        default:
            return 'darkgrey';
    }
};
