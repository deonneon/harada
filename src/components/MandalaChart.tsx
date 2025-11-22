import { useState, useEffect } from 'react';
import { ohtaniChart, emptyChart, type MandalaChartData } from '../data/ohtani-chart';
import './MandalaChart.css';

const Cell = ({
    content,
    onClick,
    isActive,
    isCenter,
    isEditable,
    onChange,
    placeholder
}: {
    content: string;
    onClick?: () => void;
    isActive?: boolean;
    isCenter?: boolean;
    isEditable?: boolean;
    onChange?: (value: string) => void;
    placeholder?: string;
}) => {
    let className = 'cell';
    if (onClick && !isEditable) className += ' clickable';
    if (isActive) className += ' active';
    if (isCenter) className += ' center';

    if (isEditable && onChange) {
        return (
            <div className={className} onClick={onClick}>
                <input
                    className="cell-input"
                    value={content}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    onClick={(e) => e.stopPropagation()}
                />
            </div>
        );
    }

    return (
        <div onClick={onClick} className={className}>
            {content}
        </div>
    );
};

export const MandalaChart = () => {
    const [mode, setMode] = useState<'example' | 'create'>('example');
    const [activeGoalIndex, setActiveGoalIndex] = useState<number | null>(null);
    const [customData, setCustomData] = useState<MandalaChartData>(() => {
        const saved = localStorage.getItem('harada-custom-chart');
        return saved ? JSON.parse(saved) : emptyChart;
    });

    useEffect(() => {
        if (mode === 'create') {
            localStorage.setItem('harada-custom-chart', JSON.stringify(customData));
        }
    }, [customData, mode]);

    const currentData = mode === 'example' ? ohtaniChart : customData;

    const handleGoalClick = (index: number) => {
        setActiveGoalIndex(activeGoalIndex === index ? null : index);
    };

    const updateCustomData = (path: 'center' | 'goal' | 'item', value: string, goalIndex?: number, itemIndex?: number) => {
        const newData = { ...customData };

        if (path === 'center') {
            newData.center = value;
        } else if (path === 'goal' && goalIndex !== undefined) {
            newData.goals[goalIndex].title = value;
        } else if (path === 'item' && goalIndex !== undefined && itemIndex !== undefined) {
            const items = newData.goals[goalIndex].items || [];
            items[itemIndex] = value;
            newData.goals[goalIndex].items = items;
        }

        setCustomData(newData);
    };

    const [viewMode, setViewMode] = useState<'interactive' | 'full'>('interactive');

    const handlePrint = () => {
        window.print();
    };

    // Helper to render a 3x3 grid for the full view
    const renderSubGrid = (centerContent: string, surroundingItems: string[], isMainCenter: boolean = false) => {
        // Ensure we have 8 items
        const safeItems = Array(8).fill("").map((_, i) => surroundingItems[i] || "");

        return (
            <div className="full-grid-subgrid">
                <Cell content={safeItems[0]} />
                <Cell content={safeItems[1]} />
                <Cell content={safeItems[2]} />
                <Cell content={safeItems[3]} />
                <Cell content={centerContent} isCenter={true} isActive={isMainCenter} />
                <Cell content={safeItems[4]} />
                <Cell content={safeItems[5]} />
                <Cell content={safeItems[6]} />
                <Cell content={safeItems[7]} />
            </div>
        );
    };

    return (
        <div className="mandala-container">
            <div className="mandala-header">
                <h1 className="mandala-title">HARADA <span className="mandala-title-span">METHOD</span></h1>
                <div className="mode-toggle">
                    <button
                        className={`toggle-btn ${mode === 'example' ? 'active' : ''}`}
                        onClick={() => { setMode('example'); setActiveGoalIndex(null); }}
                    >
                        Ohtani Example
                    </button>
                    <button
                        className={`toggle-btn ${mode === 'create' ? 'active' : ''}`}
                        onClick={() => { setMode('create'); setActiveGoalIndex(null); }}
                    >
                        Create Your Own
                    </button>
                </div>
            </div>

            {viewMode === 'interactive' ? (
                <div className="charts-wrapper">

                    {/* Main Goal View */}
                    <div className={`chart-section ${activeGoalIndex !== null ? 'dimmed' : ''}`}>
                        <div className="chart-label">Main Objective</div>
                        <div className="grid-container">
                            {/* Top Row */}
                            <Cell
                                content={currentData.goals[0].title}
                                onClick={() => handleGoalClick(0)}
                                isActive={activeGoalIndex === 0}
                                isEditable={mode === 'create'}
                                onChange={(val) => updateCustomData('goal', val, 0)}
                                placeholder="Sub-goal 1"
                            />
                            <Cell
                                content={currentData.goals[1].title}
                                onClick={() => handleGoalClick(1)}
                                isActive={activeGoalIndex === 1}
                                isEditable={mode === 'create'}
                                onChange={(val) => updateCustomData('goal', val, 1)}
                                placeholder="Sub-goal 2"
                            />
                            <Cell
                                content={currentData.goals[2].title}
                                onClick={() => handleGoalClick(2)}
                                isActive={activeGoalIndex === 2}
                                isEditable={mode === 'create'}
                                onChange={(val) => updateCustomData('goal', val, 2)}
                                placeholder="Sub-goal 3"
                            />

                            {/* Middle Row */}
                            <Cell
                                content={currentData.goals[3].title}
                                onClick={() => handleGoalClick(3)}
                                isActive={activeGoalIndex === 3}
                                isEditable={mode === 'create'}
                                onChange={(val) => updateCustomData('goal', val, 3)}
                                placeholder="Sub-goal 4"
                            />
                            <Cell
                                content={currentData.center}
                                isCenter
                                isEditable={mode === 'create'}
                                onChange={(val) => updateCustomData('center', val)}
                                placeholder="MAIN GOAL"
                            />
                            <Cell
                                content={currentData.goals[4].title}
                                onClick={() => handleGoalClick(4)}
                                isActive={activeGoalIndex === 4}
                                isEditable={mode === 'create'}
                                onChange={(val) => updateCustomData('goal', val, 4)}
                                placeholder="Sub-goal 5"
                            />

                            {/* Bottom Row */}
                            <Cell
                                content={currentData.goals[5].title}
                                onClick={() => handleGoalClick(5)}
                                isActive={activeGoalIndex === 5}
                                isEditable={mode === 'create'}
                                onChange={(val) => updateCustomData('goal', val, 5)}
                                placeholder="Sub-goal 6"
                            />
                            <Cell
                                content={currentData.goals[6].title}
                                onClick={() => handleGoalClick(6)}
                                isActive={activeGoalIndex === 6}
                                isEditable={mode === 'create'}
                                onChange={(val) => updateCustomData('goal', val, 6)}
                                placeholder="Sub-goal 7"
                            />
                            <Cell
                                content={currentData.goals[7].title}
                                onClick={() => handleGoalClick(7)}
                                isActive={activeGoalIndex === 7}
                                isEditable={mode === 'create'}
                                onChange={(val) => updateCustomData('goal', val, 7)}
                                placeholder="Sub-goal 8"
                            />
                        </div>
                    </div>

                    {/* Detail View (appears when a goal is clicked) */}
                    {activeGoalIndex !== null && (
                        <div className="chart-section animate-enter">
                            <div className="chart-label">Action Plan: {currentData.goals[activeGoalIndex].title || 'Untitled'}</div>
                            <div className="grid-container">
                                {/* We need to map the 8 items + center for the specific sub-goal */}
                                {(() => {
                                    const goal = currentData.goals[activeGoalIndex];
                                    const items = goal.items || [];
                                    // Ensure items array has 8 elements for editing
                                    const safeItems = Array(8).fill("").map((_, i) => items[i] || "");

                                    return (
                                        <>
                                            <Cell content={safeItems[0]} isEditable={mode === 'create'} onChange={(val) => updateCustomData('item', val, activeGoalIndex, 0)} placeholder="Action 1" />
                                            <Cell content={safeItems[1]} isEditable={mode === 'create'} onChange={(val) => updateCustomData('item', val, activeGoalIndex, 1)} placeholder="Action 2" />
                                            <Cell content={safeItems[2]} isEditable={mode === 'create'} onChange={(val) => updateCustomData('item', val, activeGoalIndex, 2)} placeholder="Action 3" />
                                            <Cell content={safeItems[3]} isEditable={mode === 'create'} onChange={(val) => updateCustomData('item', val, activeGoalIndex, 3)} placeholder="Action 4" />
                                            <Cell content={goal.title} isCenter isActive />
                                            <Cell content={safeItems[4]} isEditable={mode === 'create'} onChange={(val) => updateCustomData('item', val, activeGoalIndex, 4)} placeholder="Action 5" />
                                            <Cell content={safeItems[5]} isEditable={mode === 'create'} onChange={(val) => updateCustomData('item', val, activeGoalIndex, 5)} placeholder="Action 6" />
                                            <Cell content={safeItems[6]} isEditable={mode === 'create'} onChange={(val) => updateCustomData('item', val, activeGoalIndex, 6)} placeholder="Action 7" />
                                            <Cell content={safeItems[7]} isEditable={mode === 'create'} onChange={(val) => updateCustomData('item', val, activeGoalIndex, 7)} placeholder="Action 8" />
                                        </>
                                    );
                                })()}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="full-grid-scroll-container">
                    <div className="full-grid-wrapper">
                        {renderSubGrid(currentData.goals[0].title, currentData.goals[0].items || [])}
                        {renderSubGrid(currentData.goals[1].title, currentData.goals[1].items || [])}
                        {renderSubGrid(currentData.goals[2].title, currentData.goals[2].items || [])}

                        {renderSubGrid(currentData.goals[3].title, currentData.goals[3].items || [])}
                        {/* Center Main Grid */}
                        <div className="full-grid-subgrid">
                            <Cell content={currentData.goals[0].title} />
                            <Cell content={currentData.goals[1].title} />
                            <Cell content={currentData.goals[2].title} />
                            <Cell content={currentData.goals[3].title} />
                            <Cell content={currentData.center} isCenter={true} isActive={true} />
                            <Cell content={currentData.goals[4].title} />
                            <Cell content={currentData.goals[5].title} />
                            <Cell content={currentData.goals[6].title} />
                            <Cell content={currentData.goals[7].title} />
                        </div>
                        {renderSubGrid(currentData.goals[4].title, currentData.goals[4].items || [])}

                        {renderSubGrid(currentData.goals[5].title, currentData.goals[5].items || [])}
                        {renderSubGrid(currentData.goals[6].title, currentData.goals[6].items || [])}
                        {renderSubGrid(currentData.goals[7].title, currentData.goals[7].items || [])}
                    </div>
                </div>
            )}

            <div className="instruction-text">
                {mode === 'example'
                    ? <p>Click on any outer cell in the Main Objective grid to reveal the specific actions Ohtani planned to achieve it.</p>
                    : <p>Start by entering your Main Goal in the center. Then fill in the 8 sub-goals around it. Click a sub-goal to define its 8 specific actions. Your progress is saved automatically.</p>
                }
                <div className="view-controls">
                    <button className="action-btn secondary" onClick={() => setViewMode(viewMode === 'interactive' ? 'full' : 'interactive')}>
                        {viewMode === 'interactive' ? 'View Full Grid' : 'Back to Interactive'}
                    </button>
                    <button className="action-btn" onClick={handlePrint}>
                        Share / Print PDF
                    </button>
                </div>
            </div>
        </div>
    );
};
