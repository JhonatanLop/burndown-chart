import { format, subDays } from 'date-fns';
import { Milestone } from '../interfaces/Interfaces';

function getDaysBeforeDueDate(dueDate: string, daysCount: number = 20): string[] {
    const dueDateObj = new Date(dueDate);
    const daysArray: string[] = [];

    for (let i = 0; i < daysCount; i++) {
        const previousDay = subDays(dueDateObj, i + 1);
        daysArray.push(format(previousDay, 'yyyy-MM-dd'));
    }

    return daysArray;
}

function updateMilestoneWithDays(milestone: Milestone) {
    const daysBeforeDueDate = getDaysBeforeDueDate(milestone.due_on);
    milestone.days = daysBeforeDueDate;
}

export { updateMilestoneWithDays };