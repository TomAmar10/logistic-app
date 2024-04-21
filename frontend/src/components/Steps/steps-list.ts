import OutboxIcon from "@mui/icons-material/Outbox";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface Step {
  icon: any;
  description: string;
}

const stepsList: Step[] = [
  {
    icon: OutboxIcon,
    description:
      "היכנס לעמוד 'בקשה לציוד', בחר את הציוד שברצונך לקבל, ושלח את הבקשה.",
  },
  {
    icon: ScheduleSendIcon,
    description: "לאחר שליחת הבקשה, המתן לאישור מצוות הלוגיסטיקה.",
  },
  {
    icon: CheckCircleIcon,
    description: "כאשר התקבלה הבקשה, צור קשר עם צוות הלוגיסטיקה לאיסוף הציוד.",
  },
];

export default stepsList;
