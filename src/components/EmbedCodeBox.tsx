import { useState } from "react";
import { Copy, Check, Share2, Code } from "lucide-react";
import { Button } from "./ui/button";

interface EmbedCodeBoxProps {
  toolName: string;
  toolPath: string;
}

const EmbedCodeBox = ({ toolName, toolPath }: EmbedCodeBoxProps) => {
  const [copied, setCopied] = useState(false);

  const embedCode = `<iframe src="https://beginnerfxguide.com${toolPath}?embed=true"
  width="100%"
  height="600"
  frameborder="0"
  style="border: 1px solid #e5e7eb; border-radius: 12px;">
</iframe>
<p style="text-align: center; margin-top: 12px; font-size: 14px; color: #6b7280;">
  Powered by <a href="https://beginnerfxguide.com" target="_blank" rel="noopener" style="color: #d4af37; text-decoration: none; font-weight: 600;">BeginnerFXGuide</a>
</p>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20 rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Share2 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-heading font-bold">Share This Tool</h3>
          <p className="text-sm text-muted-foreground">Embed on your website for free</p>
        </div>
      </div>

      <div className="bg-background rounded-xl border border-border overflow-hidden mb-4">
        <div className="flex items-center justify-between px-4 py-2 bg-secondary/50 border-b border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Code className="w-4 h-4" />
            <span className="font-mono">HTML</span>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCopy}
            className="gap-2 h-8"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-600" />
                <span className="text-green-600">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Code</span>
              </>
            )}
          </Button>
        </div>
        <pre className="p-4 overflow-x-auto text-sm font-mono text-muted-foreground">
          <code>{embedCode}</code>
        </pre>
      </div>

      <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg p-4">
        <div className="w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <span className="text-amber-600 dark:text-amber-400 font-bold text-xs">✓</span>
        </div>
        <div className="text-sm">
          <p className="font-medium text-amber-900 dark:text-amber-100 mb-1">
            100% Free Forever
          </p>
          <p className="text-amber-700 dark:text-amber-300">
            This {toolName} is completely free to embed on your website.
            Help your visitors calculate forex values without leaving your site.
            The "Powered by" link helps us keep this tool free for everyone.
          </p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          💡 <strong>Need help?</strong> Email us at{" "}
          <a href="mailto:info@beginnerfxguide.com" className="text-primary hover:underline">
            info@beginnerfxguide.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default EmbedCodeBox;
