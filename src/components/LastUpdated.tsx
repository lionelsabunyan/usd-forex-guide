import { Calendar, RefreshCw } from "lucide-react";

interface LastUpdatedProps {
  date: string;
  reviewedBy?: string;
  className?: string;
}

/**
 * LastUpdated - GEO freshness signal component
 * AI engines prefer recently updated content
 */
const LastUpdated = ({ date, reviewedBy, className = "" }: LastUpdatedProps) => {
  return (
    <div className={`flex flex-wrap items-center gap-4 text-sm text-muted-foreground ${className}`}>
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4" />
        <span>Last updated: <strong className="text-foreground">{date}</strong></span>
      </div>
      {reviewedBy && (
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          <span>Reviewed by: <strong className="text-foreground">{reviewedBy}</strong></span>
        </div>
      )}
    </div>
  );
};

export default LastUpdated;
