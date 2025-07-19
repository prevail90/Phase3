
// All coordinates are from the bottom-left corner of the page.
// Page 1 is index 0.

export const FORM_7931_COORDS = {
  // Page 1 Header
  operatorName: { x: 145, y: 702, page: 0 },
  evaluatorName: { x: 420, y: 702, page: 0 },
  vehicleModel: { x: 70, y: 648, page: 0 },
  trailerModel: { x: 200, y: 648, page: 0 },
  evaluationType: { x: 320, y: 648, page: 0 },
  evaluationDate: { x: 480, y: 648, page: 0 },
  notes: { x: 50, y: 410, page: 0 },
  // Page 3 Footer
  finalScore: { x: 125, y: 220, page: 2 },
  autoFailures: { x: 50, y: 205, page: 2 },
  tasks: {
    // PMCS
    pmcs1: { GO: { x: 410, y: 590, page: 0 }, NO_GO: { x: 448, y: 590, page: 0 } },
    pmcs2: { GO: { x: 410, y: 550, page: 0 }, NO_GO: { x: 448, y: 550, page: 0 } },
    pmcs3: { GO: { x: 410, y: 488, page: 0 }, NO_GO: { x: 448, y: 488, page: 0 } },
    // VCL
    vcl1: { GO: { x: 495, y: 590, page: 0 }, NO_GO: { x: 532, y: 590, page: 0 } },
    vcl2: { GO: { x: 495, y: 562, page: 0 }, NO_GO: { x: 532, y: 562, page: 0 } },
    vcl3: { GO: { x: 495, y: 525, page: 0 }, NO_GO: { x: 532, y: 525, page: 0 } },
    vcl4: { GO: { x: 495, y: 500, page: 0 }, NO_GO: { x: 532, y: 500, page: 0 } },
    vcl5: { GO: { x: 495, y: 475, page: 0 }, NO_GO: { x: 532, y: 475, page: 0 } },
    // Regular Traffic
    rt1: { GO: { x: 508, y: 350, page: 0 }, NO_GO: { x: 532, y: 350, page: 0 }, 'N/A': { x: 558, y: 350, page: 0 } },
    rt2: { GO: { x: 508, y: 325, page: 0 }, NO_GO: { x: 532, y: 325, page: 0 }, 'N/A': { x: 558, y: 325, page: 0 } },
    rt3: { GO: { x: 508, y: 300, page: 0 }, NO_GO: { x: 532, y: 300, page: 0 }, 'N/A': { x: 558, y: 300, page: 0 } },
    // Lane Changes
    lc1: { GO: { x: 508, y: 250, page: 0 }, NO_GO: { x: 532, y: 250, page: 0 }, 'N/A': { x: 558, y: 250, page: 0 } },
    lc2: { GO: { x: 508, y: 225, page: 0 }, NO_GO: { x: 532, y: 225, page: 0 }, 'N/A': { x: 558, y: 225, page: 0 } },
    lc3: { GO: { x: 508, y: 200, page: 0 }, NO_GO: { x: 532, y: 200, page: 0 }, 'N/A': { x: 558, y: 200, page: 0 } },
    // Stopping
    s1: { GO: { x: 508, y: 155, page: 0 }, NO_GO: { x: 532, y: 155, page: 0 }, 'N/A': { x: 558, y: 155, page: 0 } },
    s2: { GO: { x: 508, y: 130, page: 0 }, NO_GO: { x: 532, y: 130, page: 0 }, 'N/A': { x: 558, y: 130, page: 0 } },
    s3: { GO: { x: 508, y: 105, page: 0 }, NO_GO: { x: 532, y: 105, page: 0 }, 'N/A': { x: 558, y: 105, page: 0 } },
    s4: { GO: { x: 508, y: 80, page: 0 }, NO_GO: { x: 532, y: 80, page: 0 }, 'N/A': { x: 558, y: 80, page: 0 } },
    s5: { GO: { x: 508, y: 55, page: 0 }, NO_GO: { x: 532, y: 55, page: 0 }, 'N/A': { x: 558, y: 55, page: 0 } },
    // Turning
    t1: { GO: { x: 508, y: 770, page: 1 }, NO_GO: { x: 532, y: 770, page: 1 }, 'N/A': { x: 558, y: 770, page: 1 } },
    t2: { GO: { x: 508, y: 745, page: 1 }, NO_GO: { x: 532, y: 745, page: 1 }, 'N/A': { x: 558, y: 745, page: 1 } },
    t3: { GO: { x: 508, y: 720, page: 1 }, NO_GO: { x: 532, y: 720, page: 1 }, 'N/A': { x: 558, y: 720, page: 1 } },
    t4: { GO: { x: 508, y: 695, page: 1 }, NO_GO: { x: 532, y: 695, page: 1 }, 'N/A': { x: 558, y: 695, page: 1 } },
    t5: { GO: { x: 508, y: 670, page: 1 }, NO_GO: { x: 532, y: 670, page: 1 }, 'N/A': { x: 558, y: 670, page: 1 } },
    // Curves
    c1: { GO: { x: 508, y: 625, page: 1 }, NO_GO: { x: 532, y: 625, page: 1 }, 'N/A': { x: 558, y: 625, page: 1 } },
    c2: { GO: { x: 508, y: 600, page: 1 }, NO_GO: { x: 532, y: 600, page: 1 }, 'N/A': { x: 558, y: 600, page: 1 } },
    c3: { GO: { x: 508, y: 575, page: 1 }, NO_GO: { x: 532, y: 575, page: 1 }, 'N/A': { x: 558, y: 575, page: 1 } },
    // Driving Up Grade
    dug1: { GO: { x: 508, y: 805, page: 0 }, NO_GO: { x: 532, y: 805, page: 0 }, 'N/A': { x: 558, y: 805, page: 0 } },
    dug2: { GO: { x: 508, y: 780, page: 0 }, NO_GO: { x: 532, y: 780, page: 0 }, 'N/A': { x: 558, y: 780, page: 0 } },
    dug3: { GO: { x: 508, y: 755, page: 0 }, NO_GO: { x: 532, y: 755, page: 0 }, 'N/A': { x: 558, y: 755, page: 0 } },
    // Driving Down Grade
    ddg1: { GO: { x: 508, y: 710, page: 0 }, NO_GO: { x: 532, y: 710, page: 0 }, 'N/A': { x: 558, y: 710, page: 0 } },
    ddg2: { GO: { x: 508, y: 685, page: 0 }, NO_GO: { x: 532, y: 685, page: 0 }, 'N/A': { x: 558, y: 685, page: 0 } },
    ddg3: { GO: { x: 508, y: 660, page: 0 }, NO_GO: { x: 532, y: 660, page: 0 }, 'N/A': { x: 558, y: 660, page: 0 } },
    // Railway Crossing
    rc1: { GO: { x: 508, y: 615, page: 0 }, NO_GO: { x: 532, y: 615, page: 0 }, 'N/A': { x: 558, y: 615, page: 0 } },
    rc2: { GO: { x: 508, y: 590, page: 0 }, NO_GO: { x: 532, y: 590, page: 0 }, 'N/A': { x: 558, y: 590, page: 0 } },
    rc3: { GO: { x: 508, y: 565, page: 0 }, NO_GO: { x: 532, y: 565, page: 0 }, 'N/A': { x: 558, y: 565, page: 0 } },
    // Bridge/Underpass
    bu1: { GO: { x: 508, y: 520, page: 0 }, NO_GO: { x: 532, y: 520, page: 0 }, 'N/A': { x: 558, y: 520, page: 0 } },
    bu2: { GO: { x: 508, y: 495, page: 0 }, NO_GO: { x: 532, y: 495, page: 0 }, 'N/A': { x: 558, y: 495, page: 0 } },
    bu3: { GO: { x: 508, y: 470, page: 0 }, NO_GO: { x: 532, y: 470, page: 0 }, 'N/A': { x: 558, y: 470, page: 0 } },
    bu4: { GO: { x: 508, y: 445, page: 0 }, NO_GO: { x: 532, y: 445, page: 0 }, 'N/A': { x: 558, y: 445, page: 0 } },
    // General Driving
    gdb1: { GO: { x: 508, y: 395, page: 0 }, NO_GO: { x: 532, y: 395, page: 0 }, 'N/A': { x: 558, y: 395, page: 0 } },
    gdb2: { GO: { x: 508, y: 370, page: 0 }, NO_GO: { x: 532, y: 370, page: 0 }, 'N/A': { x: 558, y: 370, page: 0 } },
    gdb3: { GO: { x: 508, y: 345, page: 0 }, NO_GO: { x: 532, y: 345, page: 0 }, 'N/A': { x: 558, y: 345, page: 0 } },
    gdb4: { GO: { x: 508, y: 320, page: 0 }, NO_GO: { x: 532, y: 320, page: 0 }, 'N/A': { x: 558, y: 320, page: 0 } },
    gdb5: { GO: { x: 508, y: 295, page: 0 }, NO_GO: { x: 532, y: 295, page: 0 }, 'N/A': { x: 558, y: 295, page: 0 } },
    gdb6: { GO: { x: 508, y: 270, page: 0 }, NO_GO: { x: 532, y: 270, page: 0 }, 'N/A': { x: 558, y: 270, page: 0 } },
    gdb7: { GO: { x: 508, y: 245, page: 0 }, NO_GO: { x: 532, y: 245, page: 0 }, 'N/A': { x: 558, y: 245, page: 0 } },
    gdb8: { GO: { x: 508, y: 220, page: 0 }, NO_GO: { x: 532, y: 220, page: 0 }, 'N/A': { x: 558, y: 220, page: 0 } },
    gdb9: { GO: { x: 508, y: 195, page: 0 }, NO_GO: { x: 532, y: 195, page: 0 }, 'N/A': { x: 558, y: 195, page: 0 } },
    gdb10: { GO: { x: 508, y: 170, page: 0 }, NO_GO: { x: 532, y: 170, page: 0 }, 'N/A': { x: 558, y: 170, page: 0 } },
    // Driving Uphill
    du1: { GO: { x: 508, y: 660, page: 1 }, NO_GO: { x: 532, y: 660, page: 1 }, 'N/A': { x: 558, y: 660, page: 1 } },
    du2: { GO: { x: 508, y: 635, page: 1 }, NO_GO: { x: 532, y: 635, page: 1 }, 'N/A': { x: 558, y: 635, page: 1 } },
    du3: { GO: { x: 508, y: 610, page: 1 }, NO_GO: { x: 532, y: 610, page: 1 }, 'N/A': { x: 558, y: 610, page: 1 } },
    du4: { GO: { x: 508, y: 585, page: 1 }, NO_GO: { x: 532, y: 585, page: 1 }, 'N/A': { x: 558, y: 585, page: 1 } },
    // Driving Downhill
    dd1: { GO: { x: 508, y: 540, page: 1 }, NO_GO: { x: 532, y: 540, page: 1 }, 'N/A': { x: 558, y: 540, page: 1 } },
    dd2: { GO: { x: 508, y: 515, page: 1 }, NO_GO: { x: 532, y: 515, page: 1 }, 'N/A': { x: 558, y: 515, page: 1 } },
    dd3: { GO: { x: 508, y: 490, page: 1 }, NO_GO: { x: 532, y: 490, page: 1 }, 'N/A': { x: 558, y: 490, page: 1 } },
    dd4: { GO: { x: 508, y: 465, page: 1 }, NO_GO: { x: 532, y: 465, page: 1 }, 'N/A': { x: 558, y: 465, page: 1 } },
    // Driving Through Ditches
    dtd1: { GO: { x: 508, y: 420, page: 1 }, NO_GO: { x: 532, y: 420, page: 1 }, 'N/A': { x: 558, y: 420, page: 1 } },
    dtd2: { GO: { x: 508, y: 395, page: 1 }, NO_GO: { x: 532, y: 395, page: 1 }, 'N/A': { x: 558, y: 395, page: 1 } },
    dtd3: { GO: { x: 508, y: 370, page: 1 }, NO_GO: { x: 532, y: 370, page: 1 }, 'N/A': { x: 558, y: 370, page: 1 } },
    dtd4: { GO: { x: 508, y: 345, page: 1 }, NO_GO: { x: 532, y: 345, page: 1 }, 'N/A': { x: 558, y: 345, page: 1 } },
    // Driving Through Rocky Terrain (Page 2)
    dtrt1: { GO: { x: 508, y: 805, page: 1 }, NO_GO: { x: 532, y: 805, page: 1 }, 'N/A': { x: 558, y: 805, page: 1 } },
    dtrt2: { GO: { x: 508, y: 780, page: 1 }, NO_GO: { x: 532, y: 780, page: 1 }, 'N/A': { x: 558, y: 780, page: 1 } },
    dtrt3: { GO: { x: 508, y: 755, page: 1 }, NO_GO: { x: 532, y: 755, page: 1 }, 'N/A': { x: 558, y: 755, page: 1 } },
    // (Page 3)
    dtrt4: { GO: { x: 508, y: 780, page: 2 }, NO_GO: { x: 532, y: 780, page: 2 }, 'N/A': { x: 558, y: 780, page: 2 } },
    dtrt5: { GO: { x: 508, y: 755, page: 2 }, NO_GO: { x: 532, y: 755, page: 2 }, 'N/A': { x: 558, y: 755, page: 2 } },
    dtrt6: { GO: { x: 508, y: 730, page: 2 }, NO_GO: { x: 532, y: 730, page: 2 }, 'N/A': { x: 558, y: 730, page: 2 } },
    // Driving Through Obstacles
    dto1: { GO: { x: 508, y: 685, page: 2 }, NO_GO: { x: 532, y: 685, page: 2 }, 'N/A': { x: 558, y: 685, page: 2 } },
    dto2: { GO: { x: 508, y: 660, page: 2 }, NO_GO: { x: 532, y: 660, page: 2 }, 'N/A': { x: 558, y: 660, page: 2 } },
    dto3: { GO: { x: 508, y: 635, page: 2 }, NO_GO: { x: 532, y: 635, page: 2 }, 'N/A': { x: 558, y: 635, page: 2 } },
    dto4: { GO: { x: 508, y: 610, page: 2 }, NO_GO: { x: 532, y: 610, page: 2 }, 'N/A': { x: 558, y: 610, page: 2 } },
    dto5: { GO: { x: 508, y: 585, page: 2 }, NO_GO: { x: 532, y: 585, page: 2 }, 'N/A': { x: 558, y: 585, page: 2 } },
    // Sand/Mud/Snow
    sms1: { GO: { x: 508, y: 540, page: 2 }, NO_GO: { x: 532, y: 540, page: 2 }, 'N/A': { x: 558, y: 540, page: 2 } },
    sms2: { GO: { x: 508, y: 515, page: 2 }, NO_GO: { x: 532, y: 515, page: 2 }, 'N/A': { x: 558, y: 515, page: 2 } },
    sms3: { GO: { x: 508, y: 490, page: 2 }, NO_GO: { x: 532, y: 490, page: 2 }, 'N/A': { x: 558, y: 490, page: 2 } },
    sms4: { GO: { x: 508, y: 465, page: 2 }, NO_GO: { x: 532, y: 465, page: 2 }, 'N/A': { x: 558, y: 465, page: 2 } },
    sms5: { GO: { x: 508, y: 440, page: 2 }, NO_GO: { x: 532, y: 440, page: 2 }, 'N/A': { x: 558, y: 440, page: 2 } },
    sms6: { GO: { x: 508, y: 415, page: 2 }, NO_GO: { x: 532, y: 415, page: 2 }, 'N/A': { x: 558, y: 415, page: 2 } },
    sms7: { GO: { x: 508, y: 390, page: 2 }, NO_GO: { x: 532, y: 390, page: 2 }, 'N/A': { x: 558, y: 390, page: 2 } },
    sms8: { GO: { x: 508, y: 365, page: 2 }, NO_GO: { x: 532, y: 365, page: 2 }, 'N/A': { x: 558, y: 365, page: 2 } },
    sms9: { GO: { x: 508, y: 340, page: 2 }, NO_GO: { x: 532, y: 340, page: 2 }, 'N/A': { x: 558, y: 340, page: 2 } },
    sms10: { GO: { x: 508, y: 315, page: 2 }, NO_GO: { x: 532, y: 315, page: 2 }, 'N/A': { x: 558, y: 315, page: 2 } },
    // Water Fording
    wf1: { GO: { x: 508, y: 270, page: 2 }, NO_GO: { x: 532, y: 270, page: 2 }, 'N/A': { x: 558, y: 270, page: 2 } },
    wf2: { GO: { x: 508, y: 245, page: 2 }, NO_GO: { x: 532, y: 245, page: 2 }, 'N/A': { x: 558, y: 245, page: 2 } },
    wf3: { GO: { x: 508, y: 220, page: 2 }, NO_GO: { x: 532, y: 220, page: 2 }, 'N/A': { x: 558, y: 220, page: 2 } },
    wf4: { GO: { x: 508, y: 195, page: 2 }, NO_GO: { x: 532, y: 195, page: 2 }, 'N/A': { x: 558, y: 195, page: 2 } },
    wf5: { GO: { x: 508, y: 170, page: 2 }, NO_GO: { x: 532, y: 170, page: 2 }, 'N/A': { x: 558, y: 170, page: 2 } },
  },
};