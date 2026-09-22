import { useState } from "react";
import { RegisterDialog } from "../components/register-dialog";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Trash2 } from "lucide-react";
import { currentUser, initialCourses } from "../lib/mock-data";

const Months = [
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
];

function formatEnrollmentDate(value?: string) {
  if (!value) return "วันนี้";

  const [date, time] = value.split("T");
  const [year, month, day] = date.split("-").map(Number);

  const buddhistYear = year >= 2400 ? year : year + 543;
  return `${day} ${Months[month - 1]} ${buddhistYear} ${time?.slice(0, 5) ?? ""}`.trim();
}

export default function EnrollmentPage() {
  const [courses, setCourses] = useState(initialCourses);

  const handleEnrollSuccess = (courseId: string, enrollTime: string) => {
    const now = new Date();
    const enrolledDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;

    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              isEnrolled: true,
              enrolledAt: `${enrolledDate}T${enrollTime}`,
            }
          : course,
      ),
    );
  };

  const handleCancelEnroll = (courseId: string) => {
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course.id === courseId
          ? { ...course, isEnrolled: false, enrolledAt: undefined }
          : course,
      ),
    );
  };

  return (
    <div className="space-y-5 ">
      <div className="flex justify-between">
        <div>
          <h1 className="text-xl font-semibold ">รายวิชาทั้งหมด</h1>
          <p className="text-xs text-muted-foreground">
            {currentUser.name} ({currentUser.studentId})
          </p>
        </div>
        <RegisterDialog
          courses={courses}
          onEnrollSuccess={handleEnrollSuccess}
        />
      </div>

      {/* รายการการ์ดวิชาทั้งหมด */}
      <div className="space-y-3">
        {courses.map((course) => (
          <Card
            key={course.id}
            className="relative border-border bg-card text-card-foreground shadow-none"
          >
            <CardHeader className="flex flex-row items-start justify-between gap-3 px-4">
              <div>
                <CardTitle className="text-sm font-semibold sm:text-base">
                  {course.name}
                </CardTitle>
                <p className="mt-1 text-xs text-muted-foreground ">
                  รหัสวิชา: {course.code} · ผู้สอน: {course.instructor}
                </p>
              </div>

              <Badge
                className={
                  course.isEnrolled
                    ? "border border-amber-200 bg-amber-100 text-amber-800 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300"
                    : "border border-purple-200 bg-purple-100 text-purple-800 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300"
                }
              >
                {course.isEnrolled ? "ลงทะเบียนแล้ว" : "เปิดรับ"}
              </Badge>
            </CardHeader>

            <CardContent className="px-4 ">
              {/* แสดงรายละเอียดเพิ่มเติมเฉพาะวิชาที่ลงทะเบียนแล้ว */}
              {course.isEnrolled && (
                <div className=" flex items-end justify-between gap-3 text-[11px] text-muted-foreground">
                  <div className="space-y-0.5">
                    <p>ชื่อ นศ.: {currentUser.name}</p>
                    <p>โปรแกรม: {currentUser.program}</p>
                    <p>
                      ลงทะเบียนเมื่อ: {formatEnrollmentDate(course.enrolledAt)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCancelEnroll(course.id)}
                    className="size-6 shrink-0 text-destructive hover:text-destructive/80"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
