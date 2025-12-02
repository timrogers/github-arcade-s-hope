import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { ContributionDay } from '@/lib/types';

interface ContributionGraphProps {
  contributions: ContributionDay[];
  playerSide: 'player1' | 'player2';
  username: string;
}

export function ContributionGraph({
  contributions,
  playerSide,
  username,
}: ContributionGraphProps) {
  const borderColor =
    playerSide === 'player1' ? 'border-primary/50' : 'border-secondary/50';
  const baseColor = playerSide === 'player1' ? 'bg-primary' : 'bg-secondary';

  const getIntensityClass = (count: number) => {
    if (count === 0) return 'bg-muted/20';
    if (count <= 5) return `${baseColor}/30`;
    if (count <= 10) return `${baseColor}/50`;
    if (count <= 15) return `${baseColor}/70`;
    return `${baseColor}`;
  };

  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  contributions.forEach((day) => {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, type: 'spring' }}
    >
      <Card
        className={`p-6 border-2 ${borderColor} hover:${borderColor.replace('50', '100')} transition-all hover:shadow-xl`}
      >
        <div className="mb-4">
          <motion.h3
            className="font-bold text-lg tracking-wide"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            @{username}
          </motion.h3>
        </div>

        <TooltipProvider delayDuration={0}>
          <div className="overflow-x-auto pb-2">
            <div className="inline-flex gap-1 min-w-full">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day, dayIndex) => (
                    <Tooltip key={`${weekIndex}-${dayIndex}`}>
                      <TooltipTrigger asChild>
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{
                            delay: 0.6 + (weekIndex * 7 + dayIndex) * 0.002,
                            type: 'spring',
                            stiffness: 500,
                            damping: 30,
                          }}
                          whileHover={{
                            scale: 1.5,
                            rotate: 5,
                            zIndex: 10,
                          }}
                          className={`w-3 h-3 rounded-sm cursor-pointer transition-all ${getIntensityClass(day.count)}`}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="text-xs">
                          <div className="font-semibold">
                            {day.count} contributions
                          </div>
                          <div className="text-muted-foreground">
                            {formatDate(day.date)}
                          </div>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </TooltipProvider>

        <motion.div
          className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <motion.div
                key={level}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + level * 0.05, type: 'spring' }}
                whileHover={{ scale: 1.3 }}
                className={`w-3 h-3 rounded-sm ${
                  level === 0
                    ? 'bg-muted/20'
                    : level === 1
                      ? `${baseColor}/30`
                      : level === 2
                        ? `${baseColor}/50`
                        : level === 3
                          ? `${baseColor}/70`
                          : `${baseColor}`
                }`}
              />
            ))}
          </div>
          <span>More</span>
        </motion.div>
      </Card>
    </motion.div>
  );
}
