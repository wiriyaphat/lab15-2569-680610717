import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="space-y-4">
      <Card className="max-w-xl mx-auto my-3 py-3">
        <CardHeader>
          <CardTitle className="text-base">
            ระบบลงทะเบียนเรียน CPE & ISNE
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-end justify-between">
          <Button onClick={() => navigate("/enrollment")}>
            ไปที่หน้าลงทะเบียนเรียน
          </Button>
        </CardContent>
      </Card>

      <div className="text-center text-xs text-muted-foreground  text-[11px]">
        จัดทำโดย Wiriyaphat Phromphong รหัสนักศึกษา 680610717
      </div>
    </div>
  );
}
