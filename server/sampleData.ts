import { storage } from './storage';
import { InsertSubject, InsertTask, InsertStudySession, InsertStudyTimeRecord } from '../shared/schema';

// Function to add sample data to the application
export async function populateSampleData() {
  // Create a default user if none exists
  let userId = 1;
  const existingUser = await storage.getUser(userId);
  
  if (!existingUser) {
    const user = await storage.createUser({
      firstName: "Student",
      lastName: "User",
      email: "student@example.com",
      username: "student",
      password: "password",
    });
    userId = user.id;
  }

  // Create sample subjects
  const subjectsData: InsertSubject[] = [
    {
      name: "Mathematics",
      color: "blue",
      userId,
      description: "Algebra, Calculus, and Statistics"
    },
    {
      name: "Computer Science",
      color: "purple",
      userId,
      description: "Programming, Algorithms, and Data Structures"
    },
    {
      name: "Physics",
      color: "green",
      userId,
      description: "Mechanics, Thermodynamics, and Electromagnetism"
    },
    {
      name: "Literature",
      color: "red",
      userId,
      description: "Fiction, Poetry, and Literary Analysis"
    },
    {
      name: "History",
      color: "amber",
      userId,
      description: "World History and Historical Events"
    }
  ];

  const subjects = [];
  for (const subjectData of subjectsData) {
    // Check if subject already exists
    const existingSubjects = await storage.getSubjects(userId);
    const exists = existingSubjects.some(s => s.name === subjectData.name);
    
    if (!exists) {
      const subject = await storage.createSubject(subjectData);
      subjects.push(subject);
    } else {
      const subject = existingSubjects.find(s => s.name === subjectData.name);
      subjects.push(subject);
    }
  }

  // Create sample tasks
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const nextWeek = new Date(today);
  nextWeek.setDate(nextWeek.getDate() + 7);
  
  const tasksData: InsertTask[] = [
    {
      title: "Complete Calculus Assignment",
      subjectId: subjects[0].id,
      userId,
      priority: "high",
      dueDate: tomorrow.toISOString().split('T')[0],
      description: "Solve problems 1-10 in Chapter 4",
      estimatedTime: 120,
      completed: false
    },
    {
      title: "Study Algorithm Complexity",
      subjectId: subjects[1].id,
      userId,
      priority: "medium",
      dueDate: nextWeek.toISOString().split('T')[0],
      description: "Review Big O notation and solve example problems",
      estimatedTime: 90,
      completed: false
    },
    {
      title: "Physics Lab Report",
      subjectId: subjects[2].id,
      userId,
      priority: "high",
      dueDate: tomorrow.toISOString().split('T')[0],
      description: "Write lab report on the pendulum experiment",
      estimatedTime: 180,
      completed: false
    },
    {
      title: "Read Shakespeare's Hamlet",
      subjectId: subjects[3].id,
      userId,
      priority: "low",
      dueDate: nextWeek.toISOString().split('T')[0],
      description: "Read Act 1 and take notes on main themes",
      estimatedTime: 120,
      completed: false
    },
    {
      title: "Research Industrial Revolution",
      subjectId: subjects[4].id,
      userId,
      priority: "medium",
      dueDate: nextWeek.toISOString().split('T')[0],
      description: "Gather sources for upcoming history essay",
      estimatedTime: 150,
      completed: false
    },
    {
      title: "Prepare for Math Quiz",
      subjectId: subjects[0].id,
      userId,
      priority: "high",
      dueDate: tomorrow.toISOString().split('T')[0],
      description: "Review integration techniques and practice problems",
      estimatedTime: 120,
      completed: false
    },
    {
      title: "Code Portfolio Project",
      subjectId: subjects[1].id,
      userId,
      priority: "medium",
      dueDate: nextWeek.toISOString().split('T')[0],
      description: "Implement the frontend design for personal website",
      estimatedTime: 240,
      completed: false
    }
  ];

  const tasks = [];
  for (const taskData of tasksData) {
    // Check if task already exists
    const existingTasks = await storage.getTasks(userId);
    const exists = existingTasks.some(t => t.title === taskData.title);
    
    if (!exists) {
      const task = await storage.createTask(taskData);
      tasks.push(task);
    } else {
      const task = existingTasks.find(t => t.title === taskData.title);
      tasks.push(task);
    }
  }

  // Create sample study sessions (schedule)
  const startOfDay = new Date();
  startOfDay.setHours(8, 0, 0, 0);
  
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
  
  const sessionsData: InsertStudySession[] = [
    {
      title: "Morning Math Session",
      date: today.toISOString().split('T')[0],
      userId,
      subjectId: subjects[0].id,
      startTime: "08:00",
      endTime: "10:00",
      description: "Focus on calculus problems",
      completed: false,
      location: "Library Study Room 3",
      participants: 1
    },
    {
      title: "Programming Practice",
      date: today.toISOString().split('T')[0],
      userId,
      subjectId: subjects[1].id,
      startTime: "13:00",
      endTime: "15:30",
      description: "Work on coding challenges and algorithm implementation",
      completed: false,
      location: "Home Office",
      participants: 1
    },
    {
      title: "Physics Study Group",
      date: tomorrow.toISOString().split('T')[0],
      userId,
      subjectId: subjects[2].id,
      startTime: "16:00",
      endTime: "18:00",
      description: "Group study for upcoming physics exam",
      completed: false,
      location: "Science Building Room 202",
      participants: 4
    },
    {
      title: "Literature Analysis",
      date: dayAfterTomorrow.toISOString().split('T')[0],
      userId,
      subjectId: subjects[3].id,
      startTime: "10:00",
      endTime: "11:30",
      description: "Analyze themes in Shakespeare's works",
      completed: false,
      location: "Campus Coffee Shop",
      participants: 1
    },
    {
      title: "History Research",
      date: dayAfterTomorrow.toISOString().split('T')[0],
      userId,
      subjectId: subjects[4].id,
      startTime: "14:00",
      endTime: "16:00",
      description: "Library research for history essay",
      completed: false,
      location: "University Library",
      participants: 1
    }
  ];

  for (const sessionData of sessionsData) {
    // Check if session already exists
    const existingSessions = await storage.getStudySessions(userId);
    const exists = existingSessions.some(s => 
      s.title === sessionData.title && 
      s.date === sessionData.date && 
      s.startTime === sessionData.startTime
    );
    
    if (!exists) {
      await storage.createStudySession(sessionData);
    }
  }

  // Create sample study time records (for progress tracking)
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);
  
  const recordsData: InsertStudyTimeRecord[] = [];
  
  // Generate records for the last 7 days
  for (let i = 0; i < 7; i++) {
    const recordDate = new Date(weekAgo);
    recordDate.setDate(recordDate.getDate() + i);
    const dateStr = recordDate.toISOString().split('T')[0];
    
    // Each subject gets some study time on different days
    subjects.forEach((subject, index) => {
      // Skip some days for variety
      if (Math.random() > 0.3) {
        recordsData.push({
          date: dateStr,
          userId,
          subjectId: subject.id,
          duration: Math.floor(Math.random() * 120) + 30, // 30-150 minutes
          taskId: tasks[index % tasks.length].id,
          focusScore: Math.floor(Math.random() * 40) + 60 // 60-100
        });
      }
    });
  }

  for (const recordData of recordsData) {
    // Check if record already exists
    const existingRecords = await storage.getStudyTimeRecords(userId);
    const exists = existingRecords.some(r => 
      r.date === recordData.date && 
      r.subjectId === recordData.subjectId &&
      r.taskId === recordData.taskId
    );
    
    if (!exists) {
      await storage.createStudyTimeRecord(recordData);
    }
  }

  return {
    subjectsCount: subjects.length,
    tasksCount: tasks.length,
    sessionsCount: sessionsData.length,
    recordsCount: recordsData.length
  };
}