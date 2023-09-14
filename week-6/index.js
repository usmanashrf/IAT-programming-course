import inquirer from 'inquirer';
class CourseEnrollment {
    static instance;
    enrolledCourses = [];
    constructor() { }
    static getInstance() {
        if (!CourseEnrollment.instance) {
            CourseEnrollment.instance = new CourseEnrollment();
        }
        return CourseEnrollment.instance;
    }
    enrollCourse(courseName) {
        this.enrolledCourses.push(courseName);
        console.log(`Enrolled in course: ${courseName}`);
    }
    dropCourse(courseName) {
        const index = this.enrolledCourses.indexOf(courseName);
        if (index !== -1) {
            this.enrolledCourses.splice(index, 1);
            console.log(`Dropped course: ${courseName}`);
        }
    }
    getEnrolledCourses() {
        return this.enrolledCourses.slice();
    }
}
// User interface
class UserInterface {
    courseEnrollment;
    constructor() {
        this.courseEnrollment = CourseEnrollment.getInstance();
    }
    async enrollCourse() {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'courseName',
                message: 'Enter the course name you want to enroll in:',
            },
        ]);
        const courseName = answers.courseName;
        this.courseEnrollment.enrollCourse(courseName);
    }
    async dropCourse() {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'courseName',
                message: 'Enter the course name you want to drop:',
            },
        ]);
        const courseName = answers.courseName;
        this.courseEnrollment.dropCourse(courseName);
    }
    viewEnrolledCourses() {
        const enrolledCourses = this.courseEnrollment.getEnrolledCourses();
        console.log('Enrolled courses:', enrolledCourses.join(', '));
    }
}
// Example usage
async function main() {
    const ui = new UserInterface();
    while (true) {
        const action = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Choose an action:',
                choices: ['Enroll in a course', 'Drop a course', 'View enrolled courses', 'Exit'],
            },
        ]);
        switch (action.action) {
            case 'Enroll in a course':
                await ui.enrollCourse();
                break;
            case 'Drop a course':
                await ui.dropCourse();
                break;
            case 'View enrolled courses':
                ui.viewEnrolledCourses();
                break;
            case 'Exit':
                return;
        }
    }
}
main();
