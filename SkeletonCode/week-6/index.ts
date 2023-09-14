import inquirer from 'inquirer';

class CourseEnrollment {
  private static instance: CourseEnrollment;
  private enrolledCourses: string[] = [];

  private constructor() {}

  public static getInstance(): CourseEnrollment {
    if (!CourseEnrollment.instance) {
      CourseEnrollment.instance = new CourseEnrollment();
    }
    return CourseEnrollment.instance;
  }

  public enrollCourse(courseName: string): void {
    //ADD YOUR CODE HERE
  }

  public dropCourse(courseName: string): void {
    const index = this.enrolledCourses.indexOf(courseName);
    if (index !== -1) {
      //ADD YOUR CODE HERE
    }
  }

  public getEnrolledCourses(): string[] {
    return this.enrolledCourses.slice();
  }
}

// User interface
class UserInterface {
  private courseEnrollment: CourseEnrollment;

  constructor() {
    this.courseEnrollment = CourseEnrollment.getInstance();
  }

  async enrollCourse(): Promise<void> {
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

  async dropCourse(): Promise<void> {
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

  viewEnrolledCourses(): void {
    const enrolledCourses = this.courseEnrollment.getEnrolledCourses();
    //ADD YOUR CODE HERE
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
        choices: ['Enroll in a course', 
                   'Drop a course', 
                   'View enrolled courses', 
                   'Exit'],
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
