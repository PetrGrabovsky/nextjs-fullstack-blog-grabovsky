import { FC } from 'react';
import { formatDate, getReadingTime } from '@/utils/helpers';
import { mutedTextClasses } from '@/utils/styles';

// Rozhraní pro props komponenty PostMeta
interface PostMetaProps {
  createdAt: Date; // Datum vytvoření příspěvku
  text: string; // Text příspěvku pro výpočet doby čtení
}

// Datum vytvoření a odhadovaná doba čtení příspěvku
const PostMeta: FC<PostMetaProps> = ({ createdAt, text }) => (
  <p className={mutedTextClasses}>
    <time dateTime={createdAt.toISOString()}>{formatDate(createdAt)}</time>
    <span aria-hidden className="mx-2">
      ·
    </span>
    {getReadingTime(text)} min read
  </p>
);

export default PostMeta;
