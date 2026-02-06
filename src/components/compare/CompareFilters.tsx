import { useState } from "react";
import { Filter, SortAsc, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export type SortOption = "rating" | "minDeposit" | "spreads" | "leverage";
export type BrokerTypeFilter = "all" | "offshore" | "regulated";

interface CompareFiltersProps {
  usAcceptedOnly: boolean;
  setUsAcceptedOnly: (value: boolean) => void;
  brokerType: BrokerTypeFilter;
  setBrokerType: (value: BrokerTypeFilter) => void;
  sortBy: SortOption;
  setSortBy: (value: SortOption) => void;
  cryptoOnly: boolean;
  setCryptoOnly: (value: boolean) => void;
  maxDeposit: number | null;
  setMaxDeposit: (value: number | null) => void;
  onReset: () => void;
}

const CompareFilters = ({
  usAcceptedOnly,
  setUsAcceptedOnly,
  brokerType,
  setBrokerType,
  sortBy,
  setSortBy,
  cryptoOnly,
  setCryptoOnly,
  maxDeposit,
  setMaxDeposit,
  onReset,
}: CompareFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasActiveFilters = usAcceptedOnly || brokerType !== "all" || cryptoOnly || maxDeposit !== null;

  return (
    <div className="bg-card border border-border rounded-xl p-4">
      {/* Mobile toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          className="w-full justify-between"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters & Sort
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-primary" />
            )}
          </span>
          <span>{isExpanded ? "Hide" : "Show"}</span>
        </Button>
      </div>

      {/* Filters - always visible on desktop, toggle on mobile */}
      <div className={`${isExpanded ? "block" : "hidden"} lg:block space-y-4`}>
        {/* Sort */}
        <div>
          <label className="text-sm font-medium mb-2 flex items-center gap-2">
            <SortAsc className="w-4 h-4" />
            Sort By
          </label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={sortBy === "rating" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("rating")}
            >
              Rating
            </Button>
            <Button
              variant={sortBy === "minDeposit" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("minDeposit")}
            >
              Min Deposit
            </Button>
            <Button
              variant={sortBy === "spreads" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("spreads")}
            >
              Spreads
            </Button>
            <Button
              variant={sortBy === "leverage" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("leverage")}
            >
              Leverage
            </Button>
          </div>
        </div>

        {/* Broker Type */}
        <div>
          <label className="text-sm font-medium mb-2 block">Broker Type</label>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant={brokerType === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setBrokerType("all")}
            >
              All
            </Button>
            <Button
              variant={brokerType === "offshore" ? "default" : "outline"}
              size="sm"
              onClick={() => setBrokerType("offshore")}
            >
              Offshore
            </Button>
            <Button
              variant={brokerType === "regulated" ? "default" : "outline"}
              size="sm"
              onClick={() => setBrokerType("regulated")}
            >
              Regulated
            </Button>
          </div>
        </div>

        {/* Max Deposit */}
        <div>
          <label className="text-sm font-medium mb-2 block">Max Deposit</label>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant={maxDeposit === null ? "default" : "outline"}
              size="sm"
              onClick={() => setMaxDeposit(null)}
            >
              Any
            </Button>
            <Button
              variant={maxDeposit === 10 ? "default" : "outline"}
              size="sm"
              onClick={() => setMaxDeposit(10)}
            >
              $10 or less
            </Button>
            <Button
              variant={maxDeposit === 50 ? "default" : "outline"}
              size="sm"
              onClick={() => setMaxDeposit(50)}
            >
              $50 or less
            </Button>
            <Button
              variant={maxDeposit === 100 ? "default" : "outline"}
              size="sm"
              onClick={() => setMaxDeposit(100)}
            >
              $100 or less
            </Button>
          </div>
        </div>

        {/* Toggles */}
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={usAcceptedOnly}
              onChange={(e) => setUsAcceptedOnly(e.target.checked)}
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
            />
            <span className="text-sm">US Clients Accepted Only</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={cryptoOnly}
              onChange={(e) => setCryptoOnly(e.target.checked)}
              className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
            />
            <span className="text-sm">Crypto Deposits Available</span>
          </label>
        </div>

        {/* Reset */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-muted-foreground"
            onClick={onReset}
          >
            <X className="w-4 h-4 mr-2" />
            Reset Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default CompareFilters;
