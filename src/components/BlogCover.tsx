import { cn } from "@/lib/utils";
import type { BlogPost } from "@/lib/blog";

type Props = {
  post: BlogPost;
  variant?: "style1" | "style2" | "style3";
  className?: string;
};

const BlogCover = ({ post, variant = "style1", className }: Props) => {
  // Style 1: Full Background Image with Dark Overlay + Title Badge
  if (variant === "style1") {
    return (
      <div className={cn("aspect-video rounded-t-lg relative overflow-hidden", className)}>
        {post.coverImage ? (
          <>
            <img
              src={post.coverImage}
              alt={`Cover image for forex article: ${post.title}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/90 backdrop-blur-sm mb-2">
                <span className="text-xs font-semibold text-primary-foreground uppercase tracking-wide">
                  {post.title.split(' ').slice(0, 2).join(' ')}
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/30 via-accent/20 to-primary/30 flex items-center justify-center">
            <span className="text-4xl font-bold text-primary/40">{post.title.charAt(0)}</span>
          </div>
        )}
      </div>
    );
  }

  // Style 2: Image with Gradient Overlay (no circular badge)
  if (variant === "style2") {
    return (
      <div className={cn("aspect-video rounded-t-lg relative overflow-hidden", className)}>
        {post.coverImage ? (
          <>
            <img
              src={post.coverImage}
              alt={`Cover image for forex article: ${post.title}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-accent/40 to-primary/60" />
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/30 via-accent/20 to-primary/30 flex items-center justify-center">
            <span className="text-4xl font-bold text-primary/40">{post.title.charAt(0)}</span>
          </div>
        )}
      </div>
    );
  }

  // Style 3: Split Design - Image Left, Gradient Right with Title
  if (variant === "style3") {
    return (
      <div className={cn("aspect-video rounded-t-lg relative overflow-hidden flex", className)}>
        {post.coverImage ? (
          <>
            <div className="w-2/3 relative">
              <img
                src={post.coverImage}
                alt={`Cover image for forex article: ${post.title}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
            </div>
            <div className="w-1/3 bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center p-4">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center">
                  <span className="text-xl font-bold text-white">{post.title.charAt(0)}</span>
                </div>
                <p className="text-xs font-semibold text-white/90 uppercase tracking-wider leading-tight">
                  {post.title.split(' ').slice(0, 3).join(' ')}
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/30 via-accent/20 to-primary/30 flex items-center justify-center">
            <span className="text-4xl font-bold text-primary/40">{post.title.charAt(0)}</span>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default BlogCover;
