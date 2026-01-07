import React from 'react';
import { User, ChevronRight } from 'lucide-react';
import { STAGES } from '../data/constants';

const RefurbPipeline = ({ refurbPipeline, updateRefurbStage }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 animate-in slide-in-from-left-4">
            {STAGES.map(stage => (
                <div key={stage} className="bg-slate-100/50 p-4 rounded-3xl border border-slate-200/50 min-h-[400px]">
                    <div className="flex justify-between items-center mb-6 px-2">
                        <h4 className="font-black text-xs uppercase text-slate-400 tracking-widest">{stage}</h4>
                        <span className="bg-white px-2 py-0.5 rounded-lg text-[10px] font-black text-slate-400 border border-slate-200">
                            {refurbPipeline.filter(i => i.stage === stage).length}
                        </span>
                    </div>
                    <div className="space-y-4">
                        {refurbPipeline.filter(i => i.stage === stage).map(unit => (
                            <div key={unit.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group relative cursor-move">
                                <p className="text-[10px] font-bold text-blue-600 mb-1">{unit.id}</p>
                                <h5 className="font-bold text-slate-800 leading-tight line-clamp-2">{unit.item}</h5>
                                <div className="mt-4 flex items-center justify-between border-t border-slate-50 pt-3">
                                    <div className="flex items-center text-xs text-slate-400 font-medium"><User size={12} className="mr-1" /> {unit.tech}</div>
                                    <button
                                        onClick={() => updateRefurbStage(unit.id)}
                                        className="p-1.5 bg-slate-50 text-slate-400 hover:text-blue-600 rounded-lg group-hover:bg-blue-50 transition-colors"
                                    >
                                        <ChevronRight size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RefurbPipeline;
