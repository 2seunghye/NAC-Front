export const lookUpArr = [
  {
    abi: 'accessControl',
    methodName: 'Yu205',
    objects: [
      { name: 'obj1', macAddress: '0.0.0.0' },
      { name: 'obj2', macAddress: '0.0.0.0' },
    ],
    subject: { macAddress: '0.0.0.0', name: 'name1' },
    scName: 'acc',
  },
  {
    abi: 'accessControl',
    methodName: 'Yu206',
    objects: [
      { name: 'obj1', macAddress: '0.0.0.0' },
      { name: 'obj2', macAddress: '0.0.0.0' },
    ],
    subject: { macAddress: '0.0.0.0', name: 'name1' },
    scName: 'acc',
  },
  {
    abi: 'accessControl',
    methodName: 'Yu207',
    objects: [
      { name: 'obj1', macAddress: '0.0.0.0' },
      { name: 'obj2', macAddress: '0.0.0.0' },
    ],
    subject: { macAddress: '0.0.0.0', name: 'name1' },
    scName: 'acc',
  },
  {
    abi: 'accessControl',
    methodName: 'Yu208',
    objects: [
      { name: 'obj1', macAddress: '0.0.0.0' },
      { name: 'obj2', macAddress: '0.0.0.0' },
    ],
    subject: { macAddress: '0.0.0.0', name: 'name1' },
    scName: 'acc',
  },
  {
    abi: 'accessControl',
    methodName: 'Yu209',
    objects: [
      { name: 'obj1', macAddress: '0.0.0.0' },
      { name: 'obj2', macAddress: '0.0.0.0' },
    ],
    subject: { macAddress: '0.0.0.0', name: 'name1' },
    scName: 'acc',
  },
  {
    abi: 'accessControl',
    methodName: 'Yu210',
    objects: [
      { name: 'obj1', macAddress: '0.0.0.0' },
      { name: 'obj2', macAddress: '0.0.0.0' },
    ],
    subject: { macAddress: '0.0.0.0', name: 'name1' },
    scName: 'acc',
  },
];

export const policyArr = [
  {
    action: 'connect',
    methodName: 'Yu',
    minInterval: 30,
    misbehaviorTables: [
      {
        penalty: 2,
        reason: 'FrequentAccess',
        time: '2020-11-07T17:07:12.819',
      },
      {
        penalty: 3,
        reason: 'FrequentAccess',
        time: '2020-11-07T17:07:12.819',
      },
      {
        penalty: 4,
        reason: 'FrequentAccess',
        time: '2020-11-07T17:07:12.819',
      },
    ],
    noFR: 1,
    object: {
      macAddress: '0.0.0.0',
      name: 'gateWay',
    },
    permission: true,
    resource: 'network',
    threshold: 1,
    timeOfUnblock: '2020-11-07T17:09:12.819',
    toLR: '2020-11-07T17:07:12.819',
  },
];
