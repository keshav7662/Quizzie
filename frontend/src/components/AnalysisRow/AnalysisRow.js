import { ExternalLink, SquarePen, Trash2 } from 'lucide-react';
import styles from "./analysisRow.module.css";
import { formatTime } from '../../utils/TimeFormatter'
const AnalysisRow = ({ className, quiz, index, onDelete }) => {

  return (
    <tr className={className}>
      <td>{index}</td>
      <td>{quiz.quizName}</td>
      <td>{formatTime(quiz.createdAt)}</td>
      <td>{quiz.impressions}</td>
      <td className={styles.iconCell}>
        <SquarePen size={20} style={{ color: 'purple', cursor: 'pointer' }} />
        <Trash2 onClick={() => onDelete(quiz._id)} size={20} style={{ color: 'red', cursor: 'pointer' }} />
        <ExternalLink size={20} style={{ cursor: 'pointer' }} />
      </td>
      <td>Quiz Wise Analysis</td>
    </tr>
  );
};

export default AnalysisRow;