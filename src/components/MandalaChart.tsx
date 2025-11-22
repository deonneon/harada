import { useState } from 'react';
import { ohtaniChart } from '../data/ohtani-chart';
import './MandalaChart.css';

const Cell = ({ 
  content, 
  onClick, 
  isActive, 
  isCenter 
}: { 
  content: string; 
  onClick?: () => void; 
  isActive?: boolean;
  isCenter?: boolean;
}) => {
  let className = 'cell';
  if (onClick) className += ' clickable';
  if (isActive) className += ' active';
  if (isCenter) className += ' center';

  return (
    <div onClick={onClick} className={className}>
      {content}
    </div>
  );
};

export const MandalaChart = () => {
  const [activeGoalIndex, setActiveGoalIndex] = useState<number | null>(null);

  const handleGoalClick = (index: number) => {
    setActiveGoalIndex(activeGoalIndex === index ? null : index);
  };

  return (
    <div className="mandala-container">
      <div className="mandala-header">
        <h1 className="mandala-title">HARADA METHOD</h1>
        <p className="mandala-subtitle">Shohei Ohtani's Open Window 64</p>
      </div>

      <div className="charts-wrapper">
        
        {/* Main Goal View */}
        <div className={`chart-section ${activeGoalIndex !== null ? 'dimmed' : ''}`}>
            <div className="chart-label">Main Objective</div>
            <div className="grid-container">
            {/* Top Row */}
            <Cell content={ohtaniChart.goals[0].title} onClick={() => handleGoalClick(0)} isActive={activeGoalIndex === 0} />
            <Cell content={ohtaniChart.goals[1].title} onClick={() => handleGoalClick(1)} isActive={activeGoalIndex === 1} />
            <Cell content={ohtaniChart.goals[2].title} onClick={() => handleGoalClick(2)} isActive={activeGoalIndex === 2} />
            
            {/* Middle Row */}
            <Cell content={ohtaniChart.goals[3].title} onClick={() => handleGoalClick(3)} isActive={activeGoalIndex === 3} />
            <Cell content={ohtaniChart.center} isCenter />
            <Cell content={ohtaniChart.goals[4].title} onClick={() => handleGoalClick(4)} isActive={activeGoalIndex === 4} />
            
            {/* Bottom Row */}
            <Cell content={ohtaniChart.goals[5].title} onClick={() => handleGoalClick(5)} isActive={activeGoalIndex === 5} />
            <Cell content={ohtaniChart.goals[6].title} onClick={() => handleGoalClick(6)} isActive={activeGoalIndex === 6} />
            <Cell content={ohtaniChart.goals[7].title} onClick={() => handleGoalClick(7)} isActive={activeGoalIndex === 7} />
            </div>
        </div>

        {/* Detail View (appears when a goal is clicked) */}
        {activeGoalIndex !== null && (
             <div className="chart-section animate-enter">
                <div className="chart-label">Action Plan</div>
                <div className="grid-container">
                    {/* We need to map the 8 items + center for the specific sub-goal */}
                    {(() => {
                        const goal = ohtaniChart.goals[activeGoalIndex];
                        const items = goal.items || [];
                        return (
                            <>
                                <Cell content={items[0]} />
                                <Cell content={items[1]} />
                                <Cell content={items[2]} />
                                <Cell content={items[3]} />
                                <Cell content={goal.title} isCenter isActive />
                                <Cell content={items[4]} />
                                <Cell content={items[5]} />
                                <Cell content={items[6]} />
                                <Cell content={items[7]} />
                            </>
                        );
                    })()}
                </div>
             </div>
        )}
      </div>

      <div className="instruction-text">
        <p>Click on any outer cell in the Main Objective grid to reveal the specific actions Ohtani planned to achieve it.</p>
      </div>
    </div>
  );
};
