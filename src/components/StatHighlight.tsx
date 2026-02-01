interface StatHighlightProps {
  stats: Array<{
    value: string;
    label: string;
    description?: string;
  }>;
  title?: string;
  source?: string;
  className?: string;
}

/**
 * StatHighlight - GEO-optimized statistics display
 * AI engines prioritize numerical data and statistics
 */
const StatHighlight = ({ stats, title, source, className = "" }: StatHighlightProps) => {
  return (
    <div className={`bg-gradient-card border border-border rounded-2xl p-6 my-8 ${className}`}>
      {title && (
        <h4 className="font-heading font-semibold text-foreground mb-4 text-center">
          {title}
        </h4>
      )}
      <div className={`grid gap-4 ${stats.length === 2 ? 'grid-cols-2' : stats.length === 3 ? 'grid-cols-3' : 'grid-cols-2 md:grid-cols-4'}`}>
        {stats.map((stat, index) => (
          <div key={index} className="text-center p-4 bg-background/50 rounded-xl">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
              {stat.value}
            </div>
            <div className="font-medium text-foreground text-sm mb-1">
              {stat.label}
            </div>
            {stat.description && (
              <div className="text-xs text-muted-foreground">
                {stat.description}
              </div>
            )}
          </div>
        ))}
      </div>
      {source && (
        <p className="text-xs text-muted-foreground text-center mt-4">
          Source: {source}
        </p>
      )}
    </div>
  );
};

export default StatHighlight;
