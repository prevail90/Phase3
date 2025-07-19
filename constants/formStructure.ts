import { TaskSectionData } from '../types/index.ts';

export const FORM_STRUCTURE: TaskSectionData[] = [
  {
    title: "PMCS EVALUATION",
    hasNaOption: false,
    hasRetestOption: false,
    columns: 1,
    tasks: [
      { id: "pmcs1", description: "Prepare for inspection" },
      { id: "pmcs2", description: "Performed before-operation inspection as listed in appropriate vehicle operators (-10 series TM). If deficiencies are noted ensure they are annotated on DA Form 5988-E/ BH Form 2404." },
      { id: "pmcs3", description: "Properly dispatch vehicle IAW Appendix F, AR 600-55." },
    ]
  },
  {
    title: "VEHICLE CONTROL LANES EVALUATION",
    hasNaOption: false,
    hasRetestOption: false,
    columns: 1,
    tasks: [
      { id: "vcl1", description: "Vehicle serpentine course" },
      { id: "vcl2", description: "Vehicle stop within prescribed limits" },
      { id: "vcl3", description: "Vehicle right/left turns" },
      { id: "vcl4", description: "Vehicle diminishing clearance" },
      { id: "vcl5", description: "Straight line backing" },
    ]
  },
  {
    title: "REGULAR TRAFFIC",
    notes: "Usual Conditions: Operate vehicle/equipment under normal conditions on road driving courses and in a controlled routes during daylight and nighttime using headlights.",
    hasNaOption: true,
    hasRetestOption: false,
    columns: 2,
    tasks: [
      { id: "rt1", description: "Selected proper lane and kept vehicle in the lane." },
      { id: "rt2", description: "Allowed proper following distance between vehicles." },
      { id: "rt3", description: "Maintained appropriate, posted speed limits." },
    ]
  },
  {
    title: "LANE CHANGES",
    hasNaOption: true,
    hasRetestOption: false,
    columns: 2,
    tasks: [
        { id: "lc1", description: "Checked traffic and turned signal on" },
        { id: "lc2", description: "Ensured adequate spacing to make lane change." },
        { id: "lc3", description: "Executed smooth lane change and canceled turn signal." },
    ]
  },
  {
    title: "STOPPING",
    hasNaOption: true,
    hasRetestOption: false,
    columns: 2,
    tasks: [
      { id: "s1", description: "Decelerated slowly coming to a smooth stop." },
      { id: "s2", description: "Left proper gap to vehicle in front as applicable." },
      { id: "s3", description: "Came to a full stop, not a rolling stop." },
      { id: "s4", description: "Did not stop over the stop line." },
      { id: "s5", description: "Utilized turn signal if making a left or right turn." },
    ]
  },
  {
    title: "TURNING (left or right)",
    hasNaOption: true,
    hasRetestOption: false,
    columns: 2,
    tasks: [
      { id: "t1", description: "Used proper signal." },
      { id: "t2", description: "Used both hands to steer." },
      { id: "t3", description: "Did not turn too wide or too short." },
      { id: "t4", description: "Used correct turning lane." },
      { id: "t5", description: "Turned signal off and accelerated to traffic flow." },
    ]
  },
  {
    title: "CURVES",
    hasNaOption: true,
    hasRetestOption: false,
    columns: 2,
    tasks: [
      { id: "c1", description: "Reduced speed upon entering the curve." },
      { id: "c2", description: "Maintained steady speed through the curve." },
      { id: "c3", description: "Did not oversteer staying in lane." },
    ]
  },
  {
    title: "DRIVING UP GRADE",
    hasNaOption: true,
    hasRetestOption: false,
    columns: 2,
    tasks: [
        { id: "dug1", description: "Stays in right lane." },
        { id: "dug2", description: "Uses 4-ways if driving slowly." },
        { id: "dug3", description: "Checks mirrors for traffic." },
    ]
  },
  {
    title: "DRIVING DOWN GRADE",
    hasNaOption: true,
    hasRetestOption: false,
    columns: 2,
    tasks: [
        { id: "ddg1", description: "Maintained safe, steady speed." },
        { id: "ddg2", description: "Maintained steady braking." },
        { id: "ddg3", description: "Stayed in proper lane, obeying speed limit." },
    ]
  },
  {
    title: "RAILWAY CROSSING",
    hasNaOption: true,
    hasRetestOption: false,
    columns: 2,
    tasks: [
        { id: "rc1", description: "Obeyed all crossing signs" },
        { id: "rc2", description: "Checked for oncoming trains" },
        { id: "rc3", description: "Did not stop on tracks" },
    ]
  },
  {
    title: "BRIDGE/UNDERPASS",
    hasNaOption: true,
    hasRetestOption: false,
    columns: 2,
    tasks: [
        { id: "bu1", description: "Know Bridge weight limit." },
        { id: "bu2", description: "Know underpass clearance." },
        { id: "bu3", description: "Crossed bridge successfully staying in lane." },
        { id: "bu4", description: "Cleared underpass without incident." },
    ]
  },
  {
    title: "GENERAL DRIVING BEHAVIOR",
    hasNaOption: true,
    hasRetestOption: false,
    columns: 1,
    tasks: [
        { id: "gdb1", description: "Driver utilized restraining device (seat belt/harness)." },
        { id: "gdb2", description: "Used brakes properly (no hard braking, no riding or pumping brake)." },
        { id: "gdb3", description: "Proper steering (both hands on wheel, not over/under steer)." },
        { id: "gdb4", description: "Obeyed all traffic signs and signals." },
        { id: "gdb5", description: "Drove without an accident." },
        { id: "gdb6", description: "Never put vehicle over sidewalks, lane markings, stop lines, etc." },
        { id: "gdb7", description: "Examiner was never thrown to left, right, or forwards." },
        { id: "gdb8", description: "Driver was never forced to take evasive action." },
        { id: "gdb9", description: "Yielded right of way to pedestrians." },
        { id: "gdb10", description: "Yielded right of way to other vehicles as appropriate." },
    ]
  },
   {
    title: "DRIVING UPHILL",
    notes: "Unusual Conditions: Operate vehicle off-road using training locations approved by local command. Focus training content on the unusual conditions defined in operator technical manual. Unimproved road surface portions may be conducted using installation tank trails.",
    hasNaOption: true,
    hasRetestOption: false,
    columns: 2,
    tasks: [
        { id: "du1", description: "If equipped with CTIS, select proper terrain mode." },
        { id: "du2", description: "Applied brakes and selected proper gear for terrain." },
        { id: "du3", description: "Released brakes and smoothly applied the throttle." },
        { id: "du4", description: "Stayed in proper lane and used 4-ways as necessary." },
    ]
  },
  {
    title: "DRIVING DOWNHILL",
    hasNaOption: true,
    hasRetestOption: false,
    columns: 2,
    tasks: [
        { id: "dd1", description: "Applied brakes and selected proper gear for terrain." },
        { id: "dd2", description: "Applied steady braking to control vehicle descent speed." },
        { id: "dd3", description: "Operated engine retarder as applicable." },
        { id: "dd4", description: "Stayed in lane allowing proper distance between vehicles." },
    ]
  },
  {
    title: "DRIVING THROUGH DITCHES",
    hasNaOption: true,
    hasRetestOption: false,
    columns: 2,
    tasks: [
        { id: "dtd1", description: "Slowed down, Assessed ditch depth." },
        { id: "dtd2", description: "Approached ditch slowly, check brakes." },
        { id: "dtd3", description: "Held steering wheel with both hands (while maintaining full control of the vehicle)." },
        { id: "dtd4", description: "Front tires cleared ditch/Rear tires cleared ditch cleared trailer (if driving with trailer)." },
    ]
  },
  {
    title: "DRIVING THROUGH ROCKY TERRAIN",
    hasNaOption: true,
    hasRetestOption: false,
    columns: 2,
    tasks: [
        { id: "dtrt1", description: "Slowed down, assessed terrain prior entering." },
        { id: "dtrt2", description: "Avoided large rocks (large rocks can damage vehicle), Smoothly entering area." },
        { id: "dtrt3", description: "Held steering wheel with both hands, Maintained full control of the vehicle." },
        { id: "dtrt4", description: "Check tire traction, braking appropriately (tire puncture are more likely to occur when operating on rocky terrain." },
        { id: "dtrt5", description: "Chose lowest angle possible (while not stopping)." },
        { id: "dtrt6", description: "Front tires cleared rocky terrain/Rear tires cleared rocky terrain (if driving with trailer, trailer cleared rocky terrain)." },
    ]
  },
  {
    title: "DRIVING THROUGH OBSTACLES",
    hasNaOption: true,
    hasRetestOption: false,
    columns: 2,
    tasks: [
        { id: "dto1", description: "Slowed down, Assessed terrain prior entering." },
        { id: "dto2", description: "Avoided large tree stumps/obstacles, Chose lowest area angle possible." },
        { id: "dto3", description: "Smooth entering, Did not stop." },
        { id: "dto4", description: "Held steering wheel with both hands Maintained full control of the vehicle (while driving operator may bounce left to right)." },
        { id: "dto5", description: "Front tires cleared logs, obstacles/rear tires cleared logs, obstacles Trailer cleared logs, obstacles (if driving with trailer)." },
    ]
  },
   {
    title: "SAND/MUD/SNOW",
    hasNaOption: true,
    hasRetestOption: false,
    columns: 1,
    tasks: [
        { id: "sms1", description: "Cover glass surface if not needed for operations. Check air filter restriction indicator. Check all gauges and indicators. If equipped with CTIS, select mode for this type of terrain." },
        { id: "sms2", description: "Apply service brake pedal and set transmission range selector to gear range outlined in vehicle specific TM. Apply driveline lock (if applicable)." },
        { id: "sms3", description: "Assessed terrain prior entering and reduced speed." },
        { id: "sms4", description: "Gradually apply throttle pedal. If skid occurs release throttle pedal and lightly apply service brake pedal." },
        { id: "sms5", description: "Made slow turns and avoid oversteering." },
        { id: "sms6", description: "Avoided steep slopes and made small steering adjustments." },
        { id: "sms7", description: "Held steering wheel with both hands." },
        { id: "sms8", description: "Maintained full control of the vehicle (while driving operator may bounce)." },
        { id: "sms9", description: "Front tires reached solid ground/Rear tires reached solid ground." },
        { id: "sms10", description: "Trailer reached solid ground (if driving with trailer)." },
    ]
  },
  {
    title: "WATER FORDING",
    hasNaOption: true,
    hasRetestOption: false,
    columns: 1,
    notes: "For further guidance visit: https://utap.army.mil (River Fording Procedures Video) or refer to specific vehicle TM.",
    tasks: [
        { id: "wf1", description: "Came to a complete stop, Assessed water depth, bottom firmness, water flow and best route of travel." },
        { id: "wf2", description: "Unbuckle restraining devices, Unlock combat doors/unlock egress hatches." },
        { id: "wf3", description: "Turn interior lights on, Turn windshield wipers on, Turned fan clutch off (as applicable)." },
        { id: "wf4", description: "Entered water slowly/ no more than 5 MPH, Avoided rocks, debris and submerged obstacles." },
        { id: "wf5", description: "Did not stop while crossing, Exited water slowly." },
    ]
  }
];

export const TOTAL_TASKS = FORM_STRUCTURE.reduce((acc, section) => acc + section.tasks.length, 0);

export const AUTOMATIC_FAILURES = [
  "Any unsafe driving act",
  "Failure to wear seat belt",
  "Failure to properly perform PMCS",
  "Not knowing location and function of gauges and controls",
  "Unsatisfactory performance on Vehicle Control Test",
  "Undue nervousness",
  "Failure to complete the road test",
];