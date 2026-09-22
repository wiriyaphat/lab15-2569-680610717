import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { NativeSelect, NativeSelectOption } from "./ui/native-select";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { currentUser } from "../lib/mock-data";
import type { EnrollmentCourse } from "../lib/types";

export function RegisterDialog({
  courses,
  onEnrollSuccess,
}: {
  courses: EnrollmentCourse[];
  onEnrollSuccess: (courseId: string, enrollTime: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState("");

  const getCurrentTime = () => {
    const now = new Date();
    return now.toTimeString().slice(0, 5);
  };

  const [enrollTime, setEnrollTime] = useState(getCurrentTime());
  // อัปเดตเวลาให้เป็นปัจจุบันทุกครั้งที่เปิด Dialog
  useEffect(() => {
    if (open) {
      setEnrollTime(getCurrentTime());
    }
  }, [open]);

  // กรองเฉพาะวิชาที่ นศ. ยังไม่ได้ลงทะเบียน (isEnrolled !== true)
  const availableCourses = courses.filter((course) => !course.isEnrolled);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCourseId) return;

    // ส่งข้อมูลการลงทะเบียนกลับไปอัปเดตสถานะที่หน้าหลัก
    onEnrollSuccess(selectedCourseId, enrollTime);

    // รีเซ็ตค่าและปิด Dialog
    setSelectedCourseId("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>+ ลงทะเบียน</Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>ลงทะเบียนรายวิชา</DialogTitle>
            <DialogDescription>
              กรอกข้อมูลรายละเอียดการลงทะเบียนเรียน
            </DialogDescription>
          </DialogHeader>

          {/* เลือกวิชา (แสดงเฉพาะวิชาที่ยังไม่ลงทะเบียน) */}
          <div className="space-y-2">
            <Label htmlFor="courseSelect">วิชา</Label>
            <NativeSelect
              id="courseSelect"
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
            >
              <NativeSelectOption value="" disabled>
                เลือกวิชา
              </NativeSelectOption>
              {availableCourses.map((item) => (
                <NativeSelectOption key={item.id} value={item.id}>
                  {item.code} - {item.name}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>

          <div className="space-y-2">
            <Label htmlFor="enrollTime">เวลา</Label>
            <Input
              id="enrollTime"
              type="time"
              value={enrollTime}
              onChange={(e) => setEnrollTime(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName">ชื่อ นศ.</Label>
            <Input
              id="fullName"
              value={currentUser.name}
              readOnly
              className="bg-muted cursor-not-allowed"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="program">โปรแกรม</Label>
            <Input
              id="program"
              value={currentUser.program}
              readOnly
              className="bg-muted cursor-not-allowed"
            />
          </div>

          <DialogFooter>
            <Button type="submit" disabled={!selectedCourseId}>
              ยืนยันการลงทะเบียน
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
