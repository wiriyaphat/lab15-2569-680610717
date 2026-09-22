import type { Course, Student } from "../lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

type CourseCardProps = {
  course: Course;
  student: Student;
  enrolledAt?: string;
  isEnrolled?: boolean; // เพิ่มตัวเช็คสถานะการลงทะเบียน
  onCancel?: () => void; // ฟังก์ชันที่จะทำงานเมื่อกดปุ่มลบ
};

export function CourseCard({
  course,
  student,
  enrolledAt,
  isEnrolled,
  onCancel,
}: CourseCardProps) {
  return (
    <Card className="relative py-2">
      <CardHeader className="py-2 px-4">
        <div className="flex items-start justify-between ">
          <div>
            <CardTitle className="text-sm font-semibold">
              {course.courseTitle}
            </CardTitle>
            <CardDescription className="text-xs mt-0.5">
              รหัสวิชา: {course.courseId} · ผู้สอน:{" "}
              {course.instructors.join(", ")}
            </CardDescription>
          </div>

          <Badge
            variant={isEnrolled ? "default" : "secondary"}
            className="text-[10px] px-2 py-0.5"
          >
            {isEnrolled ? "ลงทะเบียนแล้ว" : "เปิดรับ"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex items-end justify-between py-2 px-4">
        <div className="text-[11px] text-muted-foreground space-y-0.5">
          {isEnrolled && (
            <>
              <p>ชื่อ นศ.: Wiriyaphat Phromphong</p>
              <p>โปรแกรม: {student.program}</p>
              <p>ลงทะเบียนเมื่อ: {enrolledAt}</p>
            </>
          )}
        </div>

        {isEnrolled && onCancel && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="h-7 w-7 text-destructive hover:text-destructive/80"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
