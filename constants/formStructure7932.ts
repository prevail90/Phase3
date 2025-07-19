
import { TaskSectionData } from '../types/index';

export const FORM_STRUCTURE_7932: TaskSectionData[] = [
    {
        title: "PERFORMANCE MEASURES (USUAL)",
        notes: "USUAL CONDITIONS",
        hasNaOption: false,
        hasRetestOption: true,
        columns: 2,
        tasks: [
            { id: 'uc1', description: 'Conducted PMCS.' },
            { id: 'uc15', description: 'Performed 45-degree left turn in reverse.' },
            { id: 'uc2', description: 'Mounted vehicle and entered driver station.' },
            { id: 'uc16', description: 'Performed 90-degree right turn in reverse.' },
            { id: 'uc3', description: 'Prepared driver station for operation.' },
            { id: 'uc17', description: 'Performed 90-degree left turn in reverse.' },
            { id: 'uc4', description: 'Started vehicle.' },
            { id: 'uc18', description: 'Stopped vehicle.' },
            { id: 'uc5', description: 'Began movement.' },
            { id: 'uc19', description: 'Placed gear selector in PVT.' },
            { id: 'uc6', description: 'Accelerated to designated speed.' },
            { id: 'uc20', description: 'Performed pivot-steer left.' },
            { id: 'uc7', description: 'Performed 45-degree right turn.' },
            { id: 'uc21', description: 'Performed pivot-steer right.' },
            { id: 'uc8', description: 'Performed 45-degree left turn.' },
            { id: 'uc22', description: 'Drove over a raised obstacle.' },
            { id: 'uc9', description: 'Performed 90-degree right turn.' },
            { id: 'uc23', description: 'Drove up/down hills.' },
            { id: 'uc10', description: 'Performed 90-degree left turn.' },
            { id: 'uc24', description: 'Drove across a ditch.' },
            { id: 'uc11', description: 'Stopped vehicle.' },
            { id: 'uc25', description: 'Performed sudden braking.' },
            { id: 'uc12', description: 'Placed gear selector in reverse.' },
            { id: 'uc26', description: 'Reacted to loss of communication.' },
            { id: 'uc13', description: 'Accelerated in reverse.' },
            { id: 'uc27', description: 'Reacted to loss of brakes/steering.' },
            { id: 'uc14', description: 'Performed 45-degree right turn in reverse.' },
            { id: 'uc28', description: 'Performed shutdown procedures.' },
        ]
    },
    {
        title: 'PERFORMANCE MEASURES (UNUSUAL)',
        notes: "UNUSUAL AND EMERGENCY CONDITIONS",
        hasNaOption: false,
        hasRetestOption: true,
        columns: 2,
        tasks: [
            { id: 'uec1', description: 'Operated in dust, sand, mud, or snow.' },
            { id: 'uec2', description: 'Towed disabled vehicle.' },
            { id: 'uec3', description: 'Conducted slave start.' },
            { id: 'uec4', description: 'Retrieved mired vehicle.' },
            { id: 'uec5', description: 'Forded shallow water.' },
            { id: 'uec6', description: 'Drove over trench.' },
        ]
    },
    {
        title: 'PERFORMANCE MEASURES (EMERGENCY)',
        hasNaOption: false,
        hasRetestOption: true,
        columns: 2,
        tasks: [
            { id: 'uec7', description: 'Reacted to fire.' },
            { id: 'uec8', description: 'Reacted to rollover.' },
            { id: 'uec9', description: 'Operated portable fire extinguisher/manual modes.' },
            { id: 'uec10', description: 'Removed injured crew member/personnel.' },
        ]
    }
];

export const TOTAL_TASKS_7932 = FORM_STRUCTURE_7932.reduce((acc, section) => acc + section.tasks.length, 0);

export const AUTOMATIC_FAILURES_7932 = [
  "Any unsafe act",
  "Dangerous operation",
  "Endangers vehicle or crew",
  "Requires evaluator intervention",
  "Failure to follow directions",
  "Violation of safety regulations"
];