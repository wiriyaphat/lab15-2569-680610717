import type { Student, Course, Enrollment, EnrollmentCourse } from "./types";

export const students: Student[] = [
  {
    studentId: "650610001",
    firstName: "Matt",
    lastName: "Damon",
    program: "CPE",
  },
  {
    studentId: "650610002",
    firstName: "Cillian",
    lastName: "Murphy",
    program: "CPE",
    courses: ["261207", "261497"],
  },
  {
    studentId: "650610003",
    firstName: "Emily",
    lastName: "Blunt",
    program: "ISNE",
    courses: ["269101", "261497"],
  },
];

export const courses: Course[] = [
  {
    courseId: "261207",
    courseTitle: "Basic Computer Engineering Lab",
    instructors: ["Dome", "Chanadda"],
  },
  {
    courseId: "261497",
    courseTitle: "Full Stack Development",
    instructors: ["Dome", "Nirand", "Chanadda"],
  },
  {
    courseId: "269101",
    courseTitle: "Introduction to Information Systems and Network Engineering",
    instructors: ["KENNETH COSH"],
  },
];

// enrolledAt: เวลาตัวอย่างที่ลงทะเบียนไว้แล้ว (ไว้แสดง "ลงทะเบียนเมื่อ" บนการ์ด)
export const enrollments: Enrollment[] = [
  {
    studentId: "650610002",
    courseId: "261207",
    enrolledAt: "2026-09-13T14:15:00",
  },
  {
    studentId: "650610002",
    courseId: "261497",
    enrolledAt: "2026-09-14T09:30:00",
  },
  {
    studentId: "650610003",
    courseId: "269101",
    enrolledAt: "2026-09-13T10:05:00",
  },
  {
    studentId: "650610003",
    courseId: "261497",
    enrolledAt: "2026-09-15T16:45:00",
  },
];

// นักศึกษาที่ "ล็อกอินอยู่" — ไม่มีระบบ Login/Role ในแลปนี้ จึงกำหนดไว้ที่นี่ที่เดียว
export const CURRENT_STUDENT_ID = "650610002";
export const currentStudent = students.find(
  (s) => s.studentId === CURRENT_STUDENT_ID,
)!;

export const currentUser = {
  name: "Wiriyaphat Phromphong",
  nickname: "Thiw",
  studentId: "680610717",
  program: "CPE",
  role: "STUDENT",
  avatar: "/AngryProfile.jpg", // URL
};

export const initialCourses: EnrollmentCourse[] = [
  {
    id: "261207",
    code: "261207",
    name: "Basic Computer Engineering Lab",
    instructor: "Dome, Chanadda",
    isEnrolled: false,
  },
  {
    id: "261497",
    code: "261497",
    name: "Full Stack Development",
    instructor: "Dome, Nirand, Chanadda",
    isEnrolled: true,
    enrolledAt: "2569-09-14T09:30:00",
  },
  {
    id: "269101",
    code: "269101",
    name: "Introduction to Information Systems and Network Engineering",
    instructor: "KENNETH COSH",
    isEnrolled: true,
    enrolledAt: "2569-09-21T22:21:00",
  },
];
