function convertToHistory(data) {
    const history = [];

    data?.forEach(item => {
        const date = new Date(item.$createdAt);
        const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });

        // Find or create the month entry in history
        let monthEntry = history.find(entry => entry.month === monthYear);
        if (!monthEntry) {
            monthEntry = { month: monthYear, todos: [] };
            history.push(monthEntry);
        }

        // Add the todo item to the month entry
        monthEntry.todos.push({
            id: item.$id,
            todo: item.content,
            createdAt: item.$createdAt,
            isCompleted: item.isCompleted
        });
    });

    return history;
}

export default convertToHistory;