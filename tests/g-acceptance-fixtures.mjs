// Independent QA input and hand-counted expectations. Never a model/provider substitute.
export const G_FIXTURE = {
  sourceVersion: 'qa-G-hand-counted/1',
  demo: {
    match: {match_id:'qa-g',duration_ms:10000,kickoff:'2025-01-01T00:00:00Z',home_team_id:'home',away_team_id:'away'},
    teams:[{id:'home',name:'Home'},{id:'away',name:'Away'}],
    players:[{id:'selected',name:'Selected Player',teamId:'home',position:'RW',number:7},{id:'other',name:'Other Player',teamId:'home',position:'CF',number:9}],
    events:[
      {id:'cross-complete',t:100,type:'pass',team:'home',player:'selected',secondary:'other',outcome:'complete',q:{endMs:200,pass_type:'cross'}},
      {id:'pass-incomplete',t:300,type:'pass',team:'home',player:'selected',outcome:'incomplete',q:{endMs:400}},
      {id:'cross-unknown',t:500,type:'pass',team:'home',player:'selected',outcome:'unknown',q:{endMs:600,pass_type:'cutback',completed:true}},
      {id:'pass-complete',t:700,type:'pass',team:'home',player:'selected',outcome:'complete',q:{endMs:800}},
      {id:'shot-zero-xg',t:900,type:'shot',team:'home',player:'selected',outcome:'saved',q:{endMs:1000,xg:0}},
      {id:'shot-missing-xg',t:1100,type:'shot',team:'home',player:'selected',outcome:'blocked',q:{endMs:1200,xg:null}},
      {id:'late-shot',t:1300,type:'shot',team:'home',player:'selected',outcome:'saved',available_at_ms:2000,q:{endMs:1400,xg:0.25}},
      {id:'received-pass',t:1500,type:'pass',team:'home',player:'other',secondary:'selected',outcome:'complete',q:{endMs:1600}},
      {id:'other-shot',t:1600,type:'shot',team:'home',player:'other',outcome:'goal',q:{endMs:1700,xg:0.9}},
      {id:'future-cross',t:1800,type:'pass',team:'home',player:'selected',outcome:'complete',available_at_ms:3500,q:{endMs:3000,pass_type:'cross'}},
    ],
  },
  chanceChains:[],
};

// At 2000: four passes, two completed out of three KNOWN outcomes; two crosses,
// one completed out of one known outcome; three shots, one missing xG.
export const G_EXPECTED_2000 = Object.freeze({
  passes_attempted:4,passes_completed:2,pass_outcomes_known:3,pass_completion:2/3,
  crosses_attempted:2,crosses_completed:1,cross_outcomes_known:1,cross_completion:1,
  shots:3,xg_estimate:null,xg_samples:2,xg_missing:1,
});

// Explicitly enumerated from demo event rows, independently of production helpers.
// 50955 @ 600000 has exactly these seven passes and one shot; all complete by cutoff.
export const G_REAL_600000 = Object.freeze({
  match_id:'skillcorner_2017461',player_id:'sk_player_50955',player_name:'N. Velupillay',cutoff_ms:600000,
  pass_ids:['sk_event_8_7','sk_event_8_48','sk_event_8_61','sk_event_8_71','sk_event_8_79','sk_event_8_92','sk_event_8_95'],
  cross_ids:['sk_event_8_79','sk_event_8_95'],shot_ids:['sk_event_8_6'],
  facts:{passes_attempted:7,passes_completed:6,pass_outcomes_known:7,pass_completion:6/7,crosses_attempted:2,crosses_completed:2,cross_outcomes_known:2,cross_completion:1,shots:1,xg_estimate:0.01,xg_samples:1,xg_missing:0},
});

export const G_QUESTIONS = Object.freeze({passing:'How are his passes?',crossing:'How are his crosses?',shooting:'How many shots and estimated xG does he have?',player_summary:'How has he played?'});
