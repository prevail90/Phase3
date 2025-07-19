import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import Form7931 from './components/Form7931.tsx';
import Form7932 from './components/Form7932.tsx';
import Calculator from './components/Calculator.tsx';
import Settings from './components/Settings.tsx';

export type Tab = 'form7931' | 'form7932' | 'calculator' | 'settings';

export interface EvaluatorInfo {
    rank: string;
    name: string;
    unit: string;
}

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('form7931');
    const [evaluatorInfo, setEvaluatorInfo] = useState<EvaluatorInfo>({
        rank: '',
        name: '',
        unit: '',
    });

    // Load evaluator info from localStorage on initial render
    useEffect(() => {
        try {
            const savedInfo = localStorage.getItem('evaluatorInfo');
            if (savedInfo) {
                setEvaluatorInfo(JSON.parse(savedInfo));
            }
        } catch (error) {
            console.error("Failed to parse evaluator info from localStorage", error);
        }
    }, []);

    // Save evaluator info to localStorage whenever it changes
    useEffect(() => {
        try {
            localStorage.setItem('evaluatorInfo', JSON.stringify(evaluatorInfo));
        } catch (error) {
            console.error("Failed to save evaluator info to localStorage", error);
        }
    }, [evaluatorInfo]);

    const renderContent = () => {
        switch (activeTab) {
            case 'form7931':
                return <Form7931 evaluatorInfo={evaluatorInfo} />;
            case 'form7932':
                return <Form7932 evaluatorInfo={evaluatorInfo} />;
            case 'calculator':
                return <Calculator />;
            case 'settings':
                return <Settings evaluatorInfo={evaluatorInfo} setEvaluatorInfo={setEvaluatorInfo} />;
            default:
                return <Form7931 evaluatorInfo={evaluatorInfo} />;
        }
    };
    
    return (
        <div className="bg-gray-100 min-h-screen font-sans relative">
            <main className="pb-20">
                {renderContent()}
            </main>
            <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
    );
};

export default App;
