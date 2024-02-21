export const buildSearchQuery = (search) => {
    if (!search) return {};

    const names = search.split(' ');
    if (names.length === 1) {
        return {
            $or: [
                { firstname: { $regex: names[0], $options: 'i' } },
                { lastname: { $regex: names[0], $options: 'i' } },
                { email: { $regex: names[0], $options: 'i' } },
                { phone: { $regex: names[0], $options: 'i' } },]
        };
    } else if (names.length === 2) {
        return {
            $and: [
                { firstname: { $regex: names[0], $options: 'i' } },
                { lastname: { $regex: names[1], $options: 'i' } },
            ]
        };
    }
    // Extend this logic as needed
    return {};
};
