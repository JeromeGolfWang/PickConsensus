const PLAYERS = ['Dan', 'Tim', 'Patrick', 'Jay'];
const API_URL = 'https://soft-lab-bfdb.jay-finnigan.workers.dev';
const TEAM_ABBREV = {
    'Arizona Cardinals': 'ARI',
    'Atlanta Falcons': 'ATL',
    'Baltimore Ravens': 'BAL',
    'Buffalo Bills': 'BUF',
    'Carolina Panthers': 'CAR',
    'Chicago Bears': 'CHI',
    'Cincinnati Bengals': 'CIN',
    'Cleveland Browns': 'CLE',
    'Dallas Cowboys': 'DAL',
    'Denver Broncos': 'DEN',
    'Detroit Lions': 'DET',
    'Green Bay Packers': 'GB',
    'Houston Texans': 'HOU',
    'Indianapolis Colts': 'IND',
    'Jacksonville Jaguars': 'JAX',
    'Kansas City Chiefs': 'KC',
    'Las Vegas Raiders': 'LV',
    'Los Angeles Chargers': 'LAC',
    'Los Angeles Rams': 'LAR',
    'Miami Dolphins': 'MIA',
    'Minnesota Vikings': 'MIN',
    'New England Patriots': 'NE',
    'New Orleans Saints': 'NO',
    'New York Giants': 'NYG',
    'New York Jets': 'NYJ',
    'Philadelphia Eagles': 'PHI',
    'Pittsburgh Steelers': 'PIT',
    'San Francisco 49ers': 'SF',
    'Seattle Seahawks': 'SEA',
    'Tampa Bay Buccaneers': 'TB',
    'Tennessee Titans': 'TEN',
    'Washington Commanders': 'WAS'
};

const SCHEDULE = [
    [], // Index 0 unused
    [ // Week 1
        {date: '4-Sep-25', day: 'Thursday', away: {name: 'Dallas Cowboys', abbrev: 'DAL'}, home: {name: 'Philadelphia Eagles', abbrev: 'PHI'}, time: '8:20p ET', tv: 'NBC'},
        {date: '5-Sep-25', day: 'Friday', away: {name: 'Kansas City Chiefs', abbrev: 'KC'}, home: {name: 'Los Angeles Chargers', abbrev: 'LAC'}, time: '8:00p ET', tv: 'YouTube'},
        {date: '7-Sep-25', day: 'Sunday', away: {name: 'Tampa Bay Buccaneers', abbrev: 'TB'}, home: {name: 'Atlanta Falcons', abbrev: 'ATL'}, time: '1:00p ET', tv: 'FOX'},
        {date: '7-Sep-25', day: 'Sunday', away: {name: 'Cincinnati Bengals', abbrev: 'CIN'}, home: {name: 'Cleveland Browns', abbrev: 'CLE'}, time: '1:00p ET', tv: 'FOX'},
        {date: '7-Sep-25', day: 'Sunday', away: {name: 'Miami Dolphins', abbrev: 'MIA'}, home: {name: 'Indianapolis Colts', abbrev: 'IND'}, time: '1:00p ET', tv: 'CBS'},
        {date: '7-Sep-25', day: 'Sunday', away: {name: 'Carolina Panthers', abbrev: 'CAR'}, home: {name: 'Jacksonville Jaguars', abbrev: 'JAX'}, time: '1:00p ET', tv: 'FOX'},
        {date: '7-Sep-25', day: 'Sunday', away: {name: 'Las Vegas Raiders', abbrev: 'LV'}, home: {name: 'New England Patriots', abbrev: 'NE'}, time: '1:00p ET', tv: 'CBS'},
        {date: '7-Sep-25', day: 'Sunday', away: {name: 'Arizona Cardinals', abbrev: 'ARI'}, home: {name: 'New Orleans Saints', abbrev: 'NO'}, time: '1:00p ET', tv: 'CBS'},
        {date: '7-Sep-25', day: 'Sunday', away: {name: 'Pittsburgh Steelers', abbrev: 'PIT'}, home: {name: 'New York Jets', abbrev: 'NYJ'}, time: '1:00p ET', tv: 'CBS'},
        {date: '7-Sep-25', day: 'Sunday', away: {name: 'New York Giants', abbrev: 'NYG'}, home: {name: 'Washington Commanders', abbrev: 'WAS'}, time: '1:00p ET', tv: 'FOX'},
        {date: '7-Sep-25', day: 'Sunday', away: {name: 'Tennessee Titans', abbrev: 'TEN'}, home: {name: 'Denver Broncos', abbrev: 'DEN'}, time: '4:05p ET', tv: 'FOX'},
        {date: '7-Sep-25', day: 'Sunday', away: {name: 'San Francisco 49ers', abbrev: 'SF'}, home: {name: 'Seattle Seahawks', abbrev: 'SEA'}, time: '4:05p ET', tv: 'FOX'},
        {date: '7-Sep-25', day: 'Sunday', away: {name: 'Detroit Lions', abbrev: 'DET'}, home: {name: 'Green Bay Packers', abbrev: 'GB'}, time: '4:25p ET', tv: 'CBS'},
        {date: '7-Sep-25', day: 'Sunday', away: {name: 'Houston Texans', abbrev: 'HOU'}, home: {name: 'Los Angeles Rams', abbrev: 'LAR'}, time: '4:25p ET', tv: 'CBS'},
        {date: '7-Sep-25', day: 'Sunday', away: {name: 'Baltimore Ravens', abbrev: 'BAL'}, home: {name: 'Buffalo Bills', abbrev: 'BUF'}, time: '8:20p ET', tv: 'NBC'},
        {date: '8-Sep-25', day: 'Monday', away: {name: 'Minnesota Vikings', abbrev: 'MIN'}, home: {name: 'Chicago Bears', abbrev: 'CHI'}, time: '8:15p ET', tv: 'ABC/ESPN'},
    ],
    [ // Week 2
        {date: '11-Sep-25', day: 'Thursday', away: {name: 'Washington Commanders', abbrev: 'WAS'}, home: {name: 'Green Bay Packers', abbrev: 'GB'}, time: '8:15p ET', tv: 'Prime Video'},
        {date: '14-Sep-25', day: 'Sunday', away: {name: 'Cleveland Browns', abbrev: 'CLE'}, home: {name: 'Baltimore Ravens', abbrev: 'BAL'}, time: '1:00p ET', tv: 'CBS'},
        {date: '14-Sep-25', day: 'Sunday', away: {name: 'Jacksonville Jaguars', abbrev: 'JAX'}, home: {name: 'Cincinnati Bengals', abbrev: 'CIN'}, time: '1:00p ET', tv: 'CBS'},
        {date: '14-Sep-25', day: 'Sunday', away: {name: 'New York Giants', abbrev: 'NYG'}, home: {name: 'Dallas Cowboys', abbrev: 'DAL'}, time: '1:00p ET', tv: 'FOX'},
        {date: '14-Sep-25', day: 'Sunday', away: {name: 'Chicago Bears', abbrev: 'CHI'}, home: {name: 'Detroit Lions', abbrev: 'DET'}, time: '1:00p ET', tv: 'FOX'},
        {date: '14-Sep-25', day: 'Sunday', away: {name: 'New England Patriots', abbrev: 'NE'}, home: {name: 'Miami Dolphins', abbrev: 'MIA'}, time: '1:00p ET', tv: 'CBS'},
        {date: '14-Sep-25', day: 'Sunday', away: {name: 'San Francisco 49ers', abbrev: 'SF'}, home: {name: 'New Orleans Saints', abbrev: 'NO'}, time: '1:00p ET', tv: 'FOX'},
        {date: '14-Sep-25', day: 'Sunday', away: {name: 'Buffalo Bills', abbrev: 'BUF'}, home: {name: 'New York Jets', abbrev: 'NYJ'}, time: '1:00p ET', tv: 'CBS'},
        {date: '14-Sep-25', day: 'Sunday', away: {name: 'Seattle Seahawks', abbrev: 'SEA'}, home: {name: 'Pittsburgh Steelers', abbrev: 'PIT'}, time: '1:00p ET', tv: 'FOX'},
        {date: '14-Sep-25', day: 'Sunday', away: {name: 'Los Angeles Rams', abbrev: 'LAR'}, home: {name: 'Tennessee Titans', abbrev: 'TEN'}, time: '1:00p ET', tv: 'CBS'},
        {date: '14-Sep-25', day: 'Sunday', away: {name: 'Carolina Panthers', abbrev: 'CAR'}, home: {name: 'Arizona Cardinals', abbrev: 'ARI'}, time: '4:05p ET', tv: 'CBS'},
        {date: '14-Sep-25', day: 'Sunday', away: {name: 'Denver Broncos', abbrev: 'DEN'}, home: {name: 'Indianapolis Colts', abbrev: 'IND'}, time: '4:05p ET', tv: 'CBS'},
        {date: '14-Sep-25', day: 'Sunday', away: {name: 'Philadelphia Eagles', abbrev: 'PHI'}, home: {name: 'Kansas City Chiefs', abbrev: 'KC'}, time: '4:25p ET', tv: 'FOX'},
        {date: '14-Sep-25', day: 'Sunday', away: {name: 'Atlanta Falcons', abbrev: 'ATL'}, home: {name: 'Minnesota Vikings', abbrev: 'MIN'}, time: '8:20p ET', tv: 'NBC'},
        {date: '15-Sep-25', day: 'Monday', away: {name: 'Tampa Bay Buccaneers', abbrev: 'TB'}, home: {name: 'Houston Texans', abbrev: 'HOU'}, time: '7:00p ET', tv: 'ABC'},
        {date: '15-Sep-25', day: 'Monday', away: {name: 'Los Angeles Chargers', abbrev: 'LAC'}, home: {name: 'Las Vegas Raiders', abbrev: 'LV'}, time: '10:00p ET', tv: 'ESPN'},
    ],
    [ // Week 3
        {date: '18-Sep-25', day: 'Thursday', away: {name: 'Miami Dolphins', abbrev: 'MIA'}, home: {name: 'Buffalo Bills', abbrev: 'BUF'}, time: '8:15p ET', tv: 'Prime Video'},
        {date: '21-Sep-25', day: 'Sunday', away: {name: 'Atlanta Falcons', abbrev: 'ATL'}, home: {name: 'Carolina Panthers', abbrev: 'CAR'}, time: '1:00p ET', tv: 'FOX'},
        {date: '21-Sep-25', day: 'Sunday', away: {name: 'Green Bay Packers', abbrev: 'GB'}, home: {name: 'Cleveland Browns', abbrev: 'CLE'}, time: '1:00p ET', tv: 'FOX'},
        {date: '21-Sep-25', day: 'Sunday', away: {name: 'Houston Texans', abbrev: 'HOU'}, home: {name: 'Jacksonville Jaguars', abbrev: 'JAX'}, time: '1:00p ET', tv: 'CBS'},
        {date: '21-Sep-25', day: 'Sunday', away: {name: 'Cincinnati Bengals', abbrev: 'CIN'}, home: {name: 'Minnesota Vikings', abbrev: 'MIN'}, time: '1:00p ET', tv: 'CBS'},
        {date: '21-Sep-25', day: 'Sunday', away: {name: 'Pittsburgh Steelers', abbrev: 'PIT'}, home: {name: 'New England Patriots', abbrev: 'NE'}, time: '1:00p ET', tv: 'CBS'},
        {date: '21-Sep-25', day: 'Sunday', away: {name: 'Los Angeles Rams', abbrev: 'LAR'}, home: {name: 'Philadelphia Eagles', abbrev: 'PHI'}, time: '1:00p ET', tv: 'FOX'},
        {date: '21-Sep-25', day: 'Sunday', away: {name: 'New York Jets', abbrev: 'NYJ'}, home: {name: 'Tampa Bay Buccaneers', abbrev: 'TB'}, time: '1:00p ET', tv: 'FOX'},
        {date: '21-Sep-25', day: 'Sunday', away: {name: 'Indianapolis Colts', abbrev: 'IND'}, home: {name: 'Tennessee Titans', abbrev: 'TEN'}, time: '1:00p ET', tv: 'CBS'},
        {date: '21-Sep-25', day: 'Sunday', away: {name: 'Las Vegas Raiders', abbrev: 'LV'}, home: {name: 'Washington Commanders', abbrev: 'WAS'}, time: '1:00p ET', tv: 'FOX'},
        {date: '21-Sep-25', day: 'Sunday', away: {name: 'Denver Broncos', abbrev: 'DEN'}, home: {name: 'Los Angeles Chargers', abbrev: 'LAC'}, time: '4:05p ET', tv: 'CBS'},
        {date: '21-Sep-25', day: 'Sunday', away: {name: 'New Orleans Saints', abbrev: 'NO'}, home: {name: 'Seattle Seahawks', abbrev: 'SEA'}, time: '4:05p ET', tv: 'CBS'},
        {date: '21-Sep-25', day: 'Sunday', away: {name: 'Dallas Cowboys', abbrev: 'DAL'}, home: {name: 'Chicago Bears', abbrev: 'CHI'}, time: '4:25p ET', tv: 'FOX'},
        {date: '21-Sep-25', day: 'Sunday', away: {name: 'Arizona Cardinals', abbrev: 'ARI'}, home: {name: 'San Francisco 49ers', abbrev: 'SF'}, time: '4:25p ET', tv: 'FOX'},
        {date: '21-Sep-25', day: 'Sunday', away: {name: 'Kansas City Chiefs', abbrev: 'KC'}, home: {name: 'New York Giants', abbrev: 'NYG'}, time: '8:20p ET', tv: 'NBC'},
        {date: '22-Sep-25', day: 'Monday', away: {name: 'Detroit Lions', abbrev: 'DET'}, home: {name: 'Baltimore Ravens', abbrev: 'BAL'}, time: '8:15p ET', tv: 'ESPN/ABC'},
    ],
    [ // Week 4
        {date: '25-Sep-25', day: 'Thursday', away: {name: 'Seattle Seahawks', abbrev: 'SEA'}, home: {name: 'Arizona Cardinals', abbrev: 'ARI'}, time: '8:15p ET', tv: 'Prime Video'},
        {date: '28-Sep-25', day: 'Sunday', away: {name: 'Minnesota Vikings', abbrev: 'MIN'}, home: {name: 'Pittsburgh Steelers', abbrev: 'PIT'}, time: '9:30a ET', tv: 'NFLN'},
        {date: '28-Sep-25', day: 'Sunday', away: {name: 'Washington Commanders', abbrev: 'WAS'}, home: {name: 'Atlanta Falcons', abbrev: 'ATL'}, time: '1:00p ET', tv: 'CBS'},
        {date: '28-Sep-25', day: 'Sunday', away: {name: 'New Orleans Saints', abbrev: 'NO'}, home: {name: 'Buffalo Bills', abbrev: 'BUF'}, time: '1:00p ET', tv: 'CBS'},
        {date: '28-Sep-25', day: 'Sunday', away: {name: 'Cleveland Browns', abbrev: 'CLE'}, home: {name: 'Detroit Lions', abbrev: 'DET'}, time: '1:00p ET', tv: 'FOX'},
        {date: '28-Sep-25', day: 'Sunday', away: {name: 'Tennessee Titans', abbrev: 'TEN'}, home: {name: 'Houston Texans', abbrev: 'HOU'}, time: '1:00p ET', tv: 'CBS'},
        {date: '28-Sep-25', day: 'Sunday', away: {name: 'Carolina Panthers', abbrev: 'CAR'}, home: {name: 'New England Patriots', abbrev: 'NE'}, time: '1:00p ET', tv: 'FOX'},
        {date: '28-Sep-25', day: 'Sunday', away: {name: 'Los Angeles Chargers', abbrev: 'LAC'}, home: {name: 'New York Giants', abbrev: 'NYG'}, time: '1:00p ET', tv: 'CBS'},
        {date: '28-Sep-25', day: 'Sunday', away: {name: 'Philadelphia Eagles', abbrev: 'PHI'}, home: {name: 'Tampa Bay Buccaneers', abbrev: 'TB'}, time: '1:00p ET', tv: 'FOX'},
        {date: '28-Sep-25', day: 'Sunday', away: {name: 'Indianapolis Colts', abbrev: 'IND'}, home: {name: 'Los Angeles Rams', abbrev: 'LAR'}, time: '4:05p ET', tv: 'FOX'},
        {date: '28-Sep-25', day: 'Sunday', away: {name: 'Jacksonville Jaguars', abbrev: 'JAX'}, home: {name: 'San Francisco 49ers', abbrev: 'SF'}, time: '4:05p ET', tv: 'FOX'},
        {date: '28-Sep-25', day: 'Sunday', away: {name: 'Baltimore Ravens', abbrev: 'BAL'}, home: {name: 'Kansas City Chiefs', abbrev: 'KC'}, time: '4:25p ET', tv: 'CBS'},
        {date: '28-Sep-25', day: 'Sunday', away: {name: 'Chicago Bears', abbrev: 'CHI'}, home: {name: 'Las Vegas Raiders', abbrev: 'LV'}, time: '4:25p ET', tv: 'CBS'},
        {date: '28-Sep-25', day: 'Sunday', away: {name: 'Green Bay Packers', abbrev: 'GB'}, home: {name: 'Dallas Cowboys', abbrev: 'DAL'}, time: '8:20p ET', tv: 'NBC'},
        {date: '29-Sep-25', day: 'Monday', away: {name: 'New York Jets', abbrev: 'NYJ'}, home: {name: 'Miami Dolphins', abbrev: 'MIA'}, time: '7:15p ET', tv: 'ESPN'},
        {date: '29-Sep-25', day: 'Monday', away: {name: 'Cincinnati Bengals', abbrev: 'CIN'}, home: {name: 'Denver Broncos', abbrev: 'DEN'}, time: '8:15p ET', tv: 'ABC'},
    ],
    [ // Week 5
        {date: '2-Oct-25', day: 'Thursday', away: {name: 'San Francisco 49ers', abbrev: 'SF'}, home: {name: 'Los Angeles Rams', abbrev: 'LAR'}, time: '8:15p ET', tv: 'Prime Video'},
        {date: '5-Oct-25', day: 'Sunday', away: {name: 'Minnesota Vikings', abbrev: 'MIN'}, home: {name: 'Cleveland Browns', abbrev: 'CLE'}, time: '9:30a ET', tv: 'NFLN'},
        {date: '5-Oct-25', day: 'Sunday', away: {name: 'Houston Texans', abbrev: 'HOU'}, home: {name: 'Baltimore Ravens', abbrev: 'BAL'}, time: '1:00p ET', tv: 'CBS'},
        {date: '5-Oct-25', day: 'Sunday', away: {name: 'Miami Dolphins', abbrev: 'MIA'}, home: {name: 'Carolina Panthers', abbrev: 'CAR'}, time: '1:00p ET', tv: 'FOX'},
        {date: '5-Oct-25', day: 'Sunday', away: {name: 'Las Vegas Raiders', abbrev: 'LV'}, home: {name: 'Indianapolis Colts', abbrev: 'IND'}, time: '1:00p ET', tv: 'FOX'},
        {date: '5-Oct-25', day: 'Sunday', away: {name: 'New York Giants', abbrev: 'NYG'}, home: {name: 'New Orleans Saints', abbrev: 'NO'}, time: '1:00p ET', tv: 'CBS'},
        {date: '5-Oct-25', day: 'Sunday', away: {name: 'Dallas Cowboys', abbrev: 'DAL'}, home: {name: 'New York Jets', abbrev: 'NYJ'}, time: '1:00p ET', tv: 'FOX'},
        {date: '5-Oct-25', day: 'Sunday', away: {name: 'Denver Broncos', abbrev: 'DEN'}, home: {name: 'Philadelphia Eagles', abbrev: 'PHI'}, time: '1:00p ET', tv: 'CBS'},
        {date: '5-Oct-25', day: 'Sunday', away: {name: 'Tennessee Titans', abbrev: 'TEN'}, home: {name: 'Arizona Cardinals', abbrev: 'ARI'}, time: '4:05p ET', tv: 'CBS'},
        {date: '5-Oct-25', day: 'Sunday', away: {name: 'Tampa Bay Buccaneers', abbrev: 'TB'}, home: {name: 'Seattle Seahawks', abbrev: 'SEA'}, time: '4:05p ET', tv: 'CBS'},
        {date: '5-Oct-25', day: 'Sunday', away: {name: 'Detroit Lions', abbrev: 'DET'}, home: {name: 'Cincinnati Bengals', abbrev: 'CIN'}, time: '4:25p ET', tv: 'FOX'},
        {date: '5-Oct-25', day: 'Sunday', away: {name: 'Washington Commanders', abbrev: 'WAS'}, home: {name: 'Los Angeles Chargers', abbrev: 'LAC'}, time: '4:25p ET', tv: 'FOX'},
        {date: '5-Oct-25', day: 'Sunday', away: {name: 'New England Patriots', abbrev: 'NE'}, home: {name: 'Buffalo Bills', abbrev: 'BUF'}, time: '8:20p ET', tv: 'NBC'},
        {date: '6-Oct-25', day: 'Monday', away: {name: 'Kansas City Chiefs', abbrev: 'KC'}, home: {name: 'Jacksonville Jaguars', abbrev: 'JAX'}, time: '8:15p ET', tv: 'ESPN/ABC'},
    ],
    [ // Week 6
        {date: '9-Oct-25', day: 'Thursday', away: {name: 'Philadelphia Eagles', abbrev: 'PHI'}, home: {name: 'New York Giants', abbrev: 'NYG'}, time: '8:15p ET', tv: 'Prime Video'},
        {date: '12-Oct-25', day: 'Sunday', away: {name: 'Denver Broncos', abbrev: 'DEN'}, home: {name: 'New York Jets', abbrev: 'NYJ'}, time: '9:30a ET', tv: 'NFLN'},
        {date: '12-Oct-25', day: 'Sunday', away: {name: 'Los Angeles Rams', abbrev: 'LAR'}, home: {name: 'Baltimore Ravens', abbrev: 'BAL'}, time: '1:00p ET', tv: 'FOX'},
        {date: '12-Oct-25', day: 'Sunday', away: {name: 'Dallas Cowboys', abbrev: 'DAL'}, home: {name: 'Carolina Panthers', abbrev: 'CAR'}, time: '1:00p ET', tv: 'FOX'},
        {date: '12-Oct-25', day: 'Sunday', away: {name: 'Arizona Cardinals', abbrev: 'ARI'}, home: {name: 'Indianapolis Colts', abbrev: 'IND'}, time: '1:00p ET', tv: 'FOX'},
        {date: '12-Oct-25', day: 'Sunday', away: {name: 'Seattle Seahawks', abbrev: 'SEA'}, home: {name: 'Jacksonville Jaguars', abbrev: 'JAX'}, time: '1:00p ET', tv: 'FOX'},
        {date: '12-Oct-25', day: 'Sunday', away: {name: 'Los Angeles Chargers', abbrev: 'LAC'}, home: {name: 'Miami Dolphins', abbrev: 'MIA'}, time: '1:00p ET', tv: 'CBS'},
        {date: '12-Oct-25', day: 'Sunday', away: {name: 'Cleveland Browns', abbrev: 'CLE'}, home: {name: 'Pittsburgh Steelers', abbrev: 'PIT'}, time: '1:00p ET', tv: 'CBS'},
        {date: '12-Oct-25', day: 'Sunday', away: {name: 'San Francisco 49ers', abbrev: 'SF'}, home: {name: 'Tampa Bay Buccaneers', abbrev: 'TB'}, time: '1:00p ET', tv: 'CBS'},
        {date: '12-Oct-25', day: 'Sunday', away: {name: 'Tennessee Titans', abbrev: 'TEN'}, home: {name: 'Las Vegas Raiders', abbrev: 'LV'}, time: '4:05p ET', tv: 'FOX'},
        {date: '12-Oct-25', day: 'Sunday', away: {name: 'Cincinnati Bengals', abbrev: 'CIN'}, home: {name: 'Green Bay Packers', abbrev: 'GB'}, time: '4:25p ET', tv: 'CBS'},
        {date: '12-Oct-25', day: 'Sunday', away: {name: 'New England Patriots', abbrev: 'NE'}, home: {name: 'New Orleans Saints', abbrev: 'NO'}, time: '4:25p ET', tv: 'CBS'},
        {date: '12-Oct-25', day: 'Sunday', away: {name: 'Detroit Lions', abbrev: 'DET'}, home: {name: 'Kansas City Chiefs', abbrev: 'KC'}, time: '8:20p ET', tv: 'NBC'},
        {date: '13-Oct-25', day: 'Monday', away: {name: 'Buffalo Bills', abbrev: 'BUF'}, home: {name: 'Atlanta Falcons', abbrev: 'ATL'}, time: '7:15p ET', tv: 'ESPN'},
        {date: '13-Oct-25', day: 'Monday', away: {name: 'Chicago Bears', abbrev: 'CHI'}, home: {name: 'Washington Commanders', abbrev: 'WAS'}, time: '8:15p ET', tv: 'ABC'},
    ],
    [ // Week 7
        {date: '16-Oct-25', day: 'Thursday', away: {name: 'Pittsburgh Steelers', abbrev: 'PIT'}, home: {name: 'Cincinnati Bengals', abbrev: 'CIN'}, time: '8:15p ET', tv: 'Prime Video'},
        {date: '19-Oct-25', day: 'Sunday', away: {name: 'Los Angeles Rams', abbrev: 'LAR'}, home: {name: 'Jacksonville Jaguars', abbrev: 'JAX'}, time: '9:30a ET', tv: 'NFLN'},
        {date: '19-Oct-25', day: 'Sunday', away: {name: 'New Orleans Saints', abbrev: 'NO'}, home: {name: 'Chicago Bears', abbrev: 'CHI'}, time: '1:00p ET', tv: 'FOX'},
        {date: '19-Oct-25', day: 'Sunday', away: {name: 'Miami Dolphins', abbrev: 'MIA'}, home: {name: 'Cleveland Browns', abbrev: 'CLE'}, time: '1:00p ET', tv: 'CBS'},
        {date: '19-Oct-25', day: 'Sunday', away: {name: 'Las Vegas Raiders', abbrev: 'LV'}, home: {name: 'Dallas Cowboys', abbrev: 'DAL'}, time: '1:00p ET', tv: 'FOX'},
        {date: '19-Oct-25', day: 'Sunday', away: {name: 'New York Giants', abbrev: 'NYG'}, home: {name: 'Denver Broncos', abbrev: 'DEN'}, time: '1:00p ET', tv: 'FOX'},
        {date: '19-Oct-25', day: 'Sunday', away: {name: 'Atlanta Falcons', abbrev: 'ATL'}, home: {name: 'Detroit Lions', abbrev: 'DET'}, time: '1:00p ET', tv: 'FOX'},
        {date: '19-Oct-25', day: 'Sunday', away: {name: 'Green Bay Packers', abbrev: 'GB'}, home: {name: 'Houston Texans', abbrev: 'HOU'}, time: '1:00p ET', tv: 'FOX'},
        {date: '19-Oct-25', day: 'Sunday', away: {name: 'New York Jets', abbrev: 'NYJ'}, home: {name: 'Indianapolis Colts', abbrev: 'IND'}, time: '1:00p ET', tv: 'CBS'},
        {date: '19-Oct-25', day: 'Sunday', away: {name: 'Arizona Cardinals', abbrev: 'ARI'}, home: {name: 'Minnesota Vikings', abbrev: 'MIN'}, time: '1:00p ET', tv: 'FOX'},
        {date: '19-Oct-25', day: 'Sunday', away: {name: 'Kansas City Chiefs', abbrev: 'KC'}, home: {name: 'San Francisco 49ers', abbrev: 'SF'}, time: '4:05p ET', tv: 'CBS'},
        {date: '19-Oct-25', day: 'Sunday', away: {name: 'Baltimore Ravens', abbrev: 'BAL'}, home: {name: 'Tampa Bay Buccaneers', abbrev: 'TB'}, time: '4:05p ET', tv: 'CBS'},
        {date: '19-Oct-25', day: 'Sunday', away: {name: 'Washington Commanders', abbrev: 'WAS'}, home: {name: 'Tennessee Titans', abbrev: 'TEN'}, time: '4:25p ET', tv: 'FOX'},
        {date: '19-Oct-25', day: 'Sunday', away: {name: 'Buffalo Bills', abbrev: 'BUF'}, home: {name: 'Los Angeles Chargers', abbrev: 'LAC'}, time: '4:25p ET', tv: 'CBS'},
        {date: '19-Oct-25', day: 'Sunday', away: {name: 'Seattle Seahawks', abbrev: 'SEA'}, home: {name: 'Philadelphia Eagles', abbrev: 'PHI'}, time: '8:20p ET', tv: 'NBC'},
        {date: '20-Oct-25', day: 'Monday', away: {name: 'New England Patriots', abbrev: 'NE'}, home: {name: 'Carolina Panthers', abbrev: 'CAR'}, time: '8:15p ET', tv: 'ESPN/ABC'},
    ],
    [ // Week 8
        {date: '23-Oct-25', day: 'Thursday', away: {name: 'New Orleans Saints', abbrev: 'NO'}, home: {name: 'Atlanta Falcons', abbrev: 'ATL'}, time: '8:15p ET', tv: 'Prime Video'},
        {date: '26-Oct-25', day: 'Sunday', away: {name: 'Los Angeles Chargers', abbrev: 'LAC'}, home: {name: 'Arizona Cardinals', abbrev: 'ARI'}, time: '1:00p ET', tv: 'FOX'},
        {date: '26-Oct-25', day: 'Sunday', away: {name: 'Chicago Bears', abbrev: 'CHI'}, home: {name: 'Baltimore Ravens', abbrev: 'BAL'}, time: '1:00p ET', tv: 'FOX'},
        {date: '26-Oct-25', day: 'Sunday', away: {name: 'Carolina Panthers', abbrev: 'CAR'}, home: {name: 'Cincinnati Bengals', abbrev: 'CIN'}, time: '1:00p ET', tv: 'FOX'},
        {date: '26-Oct-25', day: 'Sunday', away: {name: 'Green Bay Packers', abbrev: 'GB'}, home: {name: 'Indianapolis Colts', abbrev: 'IND'}, time: '1:00p ET', tv: 'CBS'},
        {date: '26-Oct-25', day: 'Sunday', away: {name: 'Tennessee Titans', abbrev: 'TEN'}, home: {name: 'Jacksonville Jaguars', abbrev: 'JAX'}, time: '1:00p ET', tv: 'CBS'},
        {date: '26-Oct-25', day: 'Sunday', away: {name: 'New England Patriots', abbrev: 'NE'}, home: {name: 'Kansas City Chiefs', abbrev: 'KC'}, time: '1:00p ET', tv: 'CBS'},
        {date: '26-Oct-25', day: 'Sunday', away: {name: 'Tampa Bay Buccaneers', abbrev: 'TB'}, home: {name: 'Miami Dolphins', abbrev: 'MIA'}, time: '1:00p ET', tv: 'FOX'},
        {date: '26-Oct-25', day: 'Sunday', away: {name: 'Las Vegas Raiders', abbrev: 'LV'}, home: {name: 'New York Giants', abbrev: 'NYG'}, time: '1:00p ET', tv: 'CBS'},
        {date: '26-Oct-25', day: 'Sunday', away: {name: 'Detroit Lions', abbrev: 'DET'}, home: {name: 'New York Jets', abbrev: 'NYJ'}, time: '1:00p ET', tv: 'FOX'},
        {date: '26-Oct-25', day: 'Sunday', away: {name: 'Philadelphia Eagles', abbrev: 'PHI'}, home: {name: 'Pittsburgh Steelers', abbrev: 'PIT'}, time: '1:00p ET', tv: 'FOX'},
        {date: '26-Oct-25', day: 'Sunday', away: {name: 'Denver Broncos', abbrev: 'DEN'}, home: {name: 'San Francisco 49ers', abbrev: 'SF'}, time: '4:05p ET', tv: 'CBS'},
        {date: '26-Oct-25', day: 'Sunday', away: {name: 'Cleveland Browns', abbrev: 'CLE'}, home: {name: 'Seattle Seahawks', abbrev: 'SEA'}, time: '4:05p ET', tv: 'FOX'},
        {date: '26-Oct-25', day: 'Sunday', away: {name: 'Minnesota Vikings', abbrev: 'MIN'}, home: {name: 'Los Angeles Rams', abbrev: 'LAR'}, time: '4:25p ET', tv: 'FOX'},
        {date: '26-Oct-25', day: 'Sunday', away: {name: 'Houston Texans', abbrev: 'HOU'}, home: {name: 'Buffalo Bills', abbrev: 'BUF'}, time: '8:20p ET', tv: 'NBC'},
        {date: '27-Oct-25', day: 'Monday', away: {name: 'Dallas Cowboys', abbrev: 'DAL'}, home: {name: 'Washington Commanders', abbrev: 'WAS'}, time: '8:15p ET', tv: 'ESPN/ABC'},
    ],
    [ // Week 9
        {date: '30-Oct-25', day: 'Thursday', away: {name: 'New York Giants', abbrev: 'NYG'}, home: {name: 'Atlanta Falcons', abbrev: 'ATL'}, time: '8:15p ET', tv: 'Prime Video'},
        {date: '2-Nov-25', day: 'Sunday', away: {name: 'Los Angeles Rams', abbrev: 'LAR'}, home: {name: 'Baltimore Ravens', abbrev: 'BAL'}, time: '1:00p ET', tv: 'FOX'},
        {date: '2-Nov-25', day: 'Sunday', away: {name: 'New York Jets', abbrev: 'NYJ'}, home: {name: 'Carolina Panthers', abbrev: 'CAR'}, time: '1:00p ET', tv: 'CBS'},
        {date: '2-Nov-25', day: 'Sunday', away: {name: 'Indianapolis Colts', abbrev: 'IND'}, home: {name: 'Chicago Bears', abbrev: 'CHI'}, time: '1:00p ET', tv: 'CBS'},
        {date: '2-Nov-25', day: 'Sunday', away: {name: 'Kansas City Chiefs', abbrev: 'KC'}, home: {name: 'Cincinnati Bengals', abbrev: 'CIN'}, time: '1:00p ET', tv: 'CBS'},
        {date: '2-Nov-25', day: 'Sunday', away: {name: 'Seattle Seahawks', abbrev: 'SEA'}, home: {name: 'Dallas Cowboys', abbrev: 'DAL'}, time: '1:00p ET', tv: 'FOX'},
        {date: '2-Nov-25', day: 'Sunday', away: {name: 'Atlanta Falcons', abbrev: 'ATL'}, home: {name: 'Denver Broncos', abbrev: 'DEN'}, time: '1:00p ET', tv: 'FOX'},
        {date: '2-Nov-25', day: 'Sunday', away: {name: 'Green Bay Packers', abbrev: 'GB'}, home: {name: 'Houston Texans', abbrev: 'HOU'}, time: '1:00p ET', tv: 'FOX'},
        {date: '2-Nov-25', day: 'Sunday', away: {name: 'Jacksonville Jaguars', abbrev: 'JAX'}, home: {name: 'Miami Dolphins', abbrev: 'MIA'}, time: '1:00p ET', tv: 'CBS'},
        {date: '2-Nov-25', day: 'Sunday', away: {name: 'New Orleans Saints', abbrev: 'NO'}, home: {name: 'New England Patriots', abbrev: 'NE'}, time: '1:00p ET', tv: 'FOX'},
        {date: '2-Nov-25', day: 'Sunday', away: {name: 'Pittsburgh Steelers', abbrev: 'PIT'}, home: {name: 'Philadelphia Eagles', abbrev: 'PHI'}, time: '1:00p ET', tv: 'CBS'},
        {date: '2-Nov-25', day: 'Sunday', away: {name: 'Arizona Cardinals', abbrev: 'ARI'}, home: {name: 'San Francisco 49ers', abbrev: 'SF'}, time: '4:05p ET', tv: 'FOX'},
        {date: '2-Nov-25', day: 'Sunday', away: {name: 'Los Angeles Chargers', abbrev: 'LAC'}, home: {name: 'Tampa Bay Buccaneers', abbrev: 'TB'}, time: '4:05p ET', tv: 'CBS'},
        {date: '2-Nov-25', day: 'Sunday', away: {name: 'Cleveland Browns', abbrev: 'CLE'}, home: {name: 'Washington Commanders', abbrev: 'WAS'}, time: '4:25p ET', tv: 'CBS'},
        {date: '2-Nov-25', day: 'Sunday', away: {name: 'Detroit Lions', abbrev: 'DET'}, home: {name: 'Minnesota Vikings', abbrev: 'MIN'}, time: '8:20p ET', tv: 'NBC'},
        {date: '3-Nov-25', day: 'Monday', away: {name: 'Buffalo Bills', abbrev: 'BUF'}, home: {name: 'Las Vegas Raiders', abbrev: 'LV'}, time: '8:15p ET', tv: 'ESPN/ABC'},
    ],
    [ // Week 10
        {date: '6-Nov-25', day: 'Thursday', away: {name: 'New England Patriots', abbrev: 'NE'}, home: {name: 'New York Jets', abbrev: 'NYJ'}, time: '8:15p ET', tv: 'Prime Video'},
        {date: '9-Nov-25', day: 'Sunday', away: {name: 'Los Angeles Chargers', abbrev: 'LAC'}, home: {name: 'Baltimore Ravens', abbrev: 'BAL'}, time: '1:00p ET', tv: 'CBS'},
        {date: '9-Nov-25', day: 'Sunday', away: {name: 'New York Giants', abbrev: 'NYG'}, home: {name: 'Carolina Panthers', abbrev: 'CAR'}, time: '1:00p ET', tv: 'FOX'},
        {date: '9-Nov-25', day: 'Sunday', away: {name: 'Indianapolis Colts', abbrev: 'IND'}, home: {name: 'Chicago Bears', abbrev: 'CHI'}, time: '1:00p ET', tv: 'CBS'},
        {date: '9-Nov-25', day: 'Sunday', away: {name: 'Kansas City Chiefs', abbrev: 'KC'}, home: {name: 'Cincinnati Bengals', abbrev: 'CIN'}, time: '1:00p ET', tv: 'CBS'},
        {date: '9-Nov-25', day: 'Sunday', away: {name: 'Seattle Seahawks', abbrev: 'SEA'}, home: {name: 'Dallas Cowboys', abbrev: 'DAL'}, time: '1:00p ET', tv: 'FOX'},
        {date: '9-Nov-25', day: 'Sunday', away: {name: 'Green Bay Packers', abbrev: 'GB'}, home: {name: 'Denver Broncos', abbrev: 'DEN'}, time: '1:00p ET', tv: 'FOX'},
        {date: '9-Nov-25', day: 'Sunday', away: {name: 'Jacksonville Jaguars', abbrev: 'JAX'}, home: {name: 'Houston Texans', abbrev: 'HOU'}, time: '1:00p ET', tv: 'CBS'},
        {date: '9-Nov-25', day: 'Sunday', away: {name: 'Miami Dolphins', abbrev: 'MIA'}, home: {name: 'Las Vegas Raiders', abbrev: 'LV'}, time: '1:00p ET', tv: 'CBS'},
        {date: '9-Nov-25', day: 'Sunday', away: {name: 'New Orleans Saints', abbrev: 'NO'}, home: {name: 'Minnesota Vikings', abbrev: 'MIN'}, time: '1:00p ET', tv: 'FOX'},
        {date: '9-Nov-25', day: 'Sunday', away: {name: 'Pittsburgh Steelers', abbrev: 'PIT'}, home: {name: 'New York Giants', abbrev: 'NYG'}, time: '1:00p ET', tv: 'CBS'},
        {date: '9-Nov-25', day: 'Sunday', away: {name: 'Arizona Cardinals', abbrev: 'ARI'}, home: {name: 'Philadelphia Eagles', abbrev: 'PHI'}, time: '1:00p ET', tv: 'FOX'},
        {date: '9-Nov-25', day: 'Sunday', away: {name: 'Los Angeles Rams', abbrev: 'LAR'}, home: {name: 'San Francisco 49ers', abbrev: 'SF'}, time: '4:05p ET', tv: 'FOX'},
        {date: '9-Nov-25', day: 'Sunday', away: {name: 'Cleveland Browns', abbrev: 'CLE'}, home: {name: 'Tampa Bay Buccaneers', abbrev: 'TB'}, time: '4:05p ET', tv: 'CBS'},
        {date: '9-Nov-25', day: 'Sunday', away: {name: 'Detroit Lions', abbrev: 'DET'}, home: {name: 'Washington Commanders', abbrev: 'WAS'}, time: '4:25p ET', tv: 'FOX'},
        {date: '9-Nov-25', day: 'Sunday', away: {name: 'Buffalo Bills', abbrev: 'BUF'}, home: {name: 'Atlanta Falcons', abbrev: 'ATL'}, time: '8:20p ET', tv: 'NBC'},
        {date: '10-Nov-25', day: 'Monday', away: {name: 'Tennessee Titans', abbrev: 'TEN'}, home: {name: 'Jacksonville Jaguars', abbrev: 'JAX'}, time: '8:15p ET', tv: 'ESPN/ABC'},
    ],
    [ // Week 11
        {date: '13-Nov-25', day: 'Thursday', away: {name: 'New York Jets', abbrev: 'NYJ'}, home: {name: 'Arizona Cardinals', abbrev: 'ARI'}, time: '8:15p ET', tv: 'Prime Video'},
        {date: '16-Nov-25', day: 'Sunday', away: {name: 'Los Angeles Rams', abbrev: 'LAR'}, home: {name: 'Baltimore Ravens', abbrev: 'BAL'}, time: '1:00p ET', tv: 'FOX'},
        {date: '16-Nov-25', day: 'Sunday', away: {name: 'New York Giants', abbrev: 'NYG'}, home: {name: 'Carolina Panthers', abbrev: 'CAR'}, time: '1:00p ET', tv: 'FOX'},
        {date: '16-Nov-25', day: 'Sunday', away: {name: 'Indianapolis Colts', abbrev: 'IND'}, home: {name: 'Chicago Bears', abbrev: 'CHI'}, time: '1:00p ET', tv: 'CBS'},
        {date: '16-Nov-25', day: 'Sunday', away: {name: 'Kansas City Chiefs', abbrev: 'KC'}, home: {name: 'Cleveland Browns', abbrev: 'CLE'}, time: '1:00p ET', tv: 'CBS'},
        {date: '16-Nov-25', day: 'Sunday', away: {name: 'Seattle Seahawks', abbrev: 'SEA'}, home: {name: 'Dallas Cowboys', abbrev: 'DAL'}, time: '1:00p ET', tv: 'FOX'},
        {date: '16-Nov-25', day: 'Sunday', away: {name: 'Green Bay Packers', abbrev: 'GB'}, home: {name: 'Detroit Lions', abbrev: 'DET'}, time: '1:00p ET', tv: 'FOX'},
        {date: '16-Nov-25', day: 'Sunday', away: {name: 'Houston Texans', abbrev: 'HOU'}, home: {name: 'Jacksonville Jaguars', abbrev: 'JAX'}, time: '1:00p ET', tv: 'CBS'},
        {date: '16-Nov-25', day: 'Sunday', away: {name: 'Miami Dolphins', abbrev: 'MIA'}, home: {name: 'Las Vegas Raiders', abbrev: 'LV'}, time: '1:00p ET', tv: 'CBS'},
        {date: '16-Nov-25', day: 'Sunday', away: {name: 'New Orleans Saints', abbrev: 'NO'}, home: {name: 'Minnesota Vikings', abbrev: 'MIN'}, time: '1:00p ET', tv: 'FOX'},
        {date: '16-Nov-25', day: 'Sunday', away: {name: 'Pittsburgh Steelers', abbrev: 'PIT'}, home: {name: 'New England Patriots', abbrev: 'NE'}, time: '1:00p ET', tv: 'CBS'},
        {date: '16-Nov-25', day: 'Sunday', away: {name: 'Atlanta Falcons', abbrev: 'ATL'}, home: {name: 'Philadelphia Eagles', abbrev: 'PHI'}, time: '1:00p ET', tv: 'FOX'},
        {date: '16-Nov-25', day: 'Sunday', away: {name: 'Los Angeles Chargers', abbrev: 'LAC'}, home: {name: 'San Francisco 49ers', abbrev: 'SF'}, time: '4:05p ET', tv: 'CBS'},
        {date: '16-Nov-25', day: 'Sunday', away: {name: 'Cincinnati Bengals', abbrev: 'CIN'}, home: {name: 'Tampa Bay Buccaneers', abbrev: 'TB'}, time: '4:05p ET', tv: 'FOX'},
        {date: '16-Nov-25', day: 'Sunday', away: {name: 'Denver Broncos', abbrev: 'DEN'}, home: {name: 'Washington Commanders', abbrev: 'WAS'}, time: '4:25p ET', tv: 'CBS'},
        {date: '16-Nov-25', day: 'Sunday', away: {name: 'Buffalo Bills', abbrev: 'BUF'}, home: {name: 'Tennessee Titans', abbrev: 'TEN'}, time: '8:20p ET', tv: 'NBC'},
        {date: '17-Nov-25', day: 'Monday', away: {name: 'New York Jets', abbrev: 'NYJ'}, home: {name: 'New Orleans Saints', abbrev: 'NO'}, time: '8:15p ET', tv: 'ESPN/ABC'},
    ],
    [ // Week 12
        {date: '20-Nov-25', day: 'Thursday', away: {name: 'Los Angeles Chargers', abbrev: 'LAC'}, home: {name: 'Arizona Cardinals', abbrev: 'ARI'}, time: '8:15p ET', tv: 'Prime Video'},
        {date: '23-Nov-25', day: 'Sunday', away: {name: 'New York Giants', abbrev: 'NYG'}, home: {name: 'Atlanta Falcons', abbrev: 'ATL'}, time: '1:00p ET', tv: 'FOX'},
        {date: '23-Nov-25', day: 'Sunday', away: {name: 'Indianapolis Colts', abbrev: 'IND'}, home: {name: 'Baltimore Ravens', abbrev: 'BAL'}, time: '1:00p ET', tv: 'CBS'},
        {date: '23-Nov-25', day: 'Sunday', away: {name: 'Kansas City Chiefs', abbrev: 'KC'}, home: {name: 'Carolina Panthers', abbrev: 'CAR'}, time: '1:00p ET', tv: 'FOX'},
        {date: '23-Nov-25', day: 'Sunday', away: {name: 'Seattle Seahawks', abbrev: 'SEA'}, home: {name: 'Chicago Bears', abbrev: 'CHI'}, time: '1:00p ET', tv: 'FOX'},
        {date: '23-Nov-25', day: 'Sunday', away: {name: 'Green Bay Packers', abbrev: 'GB'}, home: {name: 'Cincinnati Bengals', abbrev: 'CIN'}, time: '1:00p ET', tv: 'FOX'},
        {date: '23-Nov-25', day: 'Sunday', away: {name: 'Houston Texans', abbrev: 'HOU'}, home: {name: 'Cleveland Browns', abbrev: 'CLE'}, time: '1:00p ET', tv: 'CBS'},
        {date: '23-Nov-25', day: 'Sunday', away: {name: 'Jacksonville Jaguars', abbrev: 'JAX'}, home: {name: 'Detroit Lions', abbrev: 'DET'}, time: '1:00p ET', tv: 'FOX'},
        {date: '23-Nov-25', day: 'Sunday', away: {name: 'Miami Dolphins', abbrev: 'MIA'}, home: {name: 'Las Vegas Raiders', abbrev: 'LV'}, time: '1:00p ET', tv: 'CBS'},
        {date: '23-Nov-25', day: 'Sunday', away: {name: 'New Orleans Saints', abbrev: 'NO'}, home: {name: 'Minnesota Vikings', abbrev: 'MIN'}, time: '1:00p ET', tv: 'FOX'},
        {date: '23-Nov-25', day: 'Sunday', away: {name: 'Pittsburgh Steelers', abbrev: 'PIT'}, home: {name: 'New England Patriots', abbrev: 'NE'}, time: '1:00p ET', tv: 'CBS'},
        {date: '23-Nov-25', day: 'Sunday', away: {name: 'Philadelphia Eagles', abbrev: 'PHI'}, home: {name: 'New York Jets', abbrev: 'NYJ'}, time: '1:00p ET', tv: 'FOX'},
        {date: '23-Nov-25', day: 'Sunday', away: {name: 'Los Angeles Rams', abbrev: 'LAR'}, home: {name: 'San Francisco 49ers', abbrev: 'SF'}, time: '4:05p ET', tv: 'FOX'},
        {date: '23-Nov-25', day: 'Sunday', away: {name: 'Dallas Cowboys', abbrev: 'DAL'}, home: {name: 'Tampa Bay Buccaneers', abbrev: 'TB'}, time: '4:05p ET', tv: 'FOX'},
        {date: '23-Nov-25', day: 'Sunday', away: {name: 'Denver Broncos', abbrev: 'DEN'}, home: {name: 'Washington Commanders', abbrev: 'WAS'}, time: '4:25p ET', tv: 'CBS'},
        {date: '23-Nov-25', day: 'Sunday', away: {name: 'Buffalo Bills', abbrev: 'BUF'}, home: {name: 'Tennessee Titans', abbrev: 'TEN'}, time: '8:20p ET', tv: 'NBC'},
        {date: '24-Nov-25', day: 'Monday', away: {name: 'Carolina Panthers', abbrev: 'CAR'}, home: {name: 'San Francisco 49ers', abbrev: 'SF'}, time: '8:15p ET', tv: 'ESPN'},
    ],
    [ // Week 13
        {date: '27-Nov-25', day: 'Thursday', away: {name: 'Green Bay Packers', abbrev: 'GB'}, home: {name: 'Detroit Lions', abbrev: 'DET'}, time: '1:00p ET', tv: 'FOX'},
        {date: '27-Nov-25', day: 'Thursday', away: {name: 'Kansas City Chiefs', abbrev: 'KC'}, home: {name: 'Dallas Cowboys', abbrev: 'DAL'}, time: '4:30p ET', tv: 'CBS'},
        {date: '27-Nov-25', day: 'Thursday', away: {name: 'Cincinnati Bengals', abbrev: 'CIN'}, home: {name: 'Baltimore Ravens', abbrev: 'BAL'}, time: '8:20p ET', tv: 'NBC'},
        {date: '28-Nov-25', day: 'Friday', away: {name: 'Chicago Bears', abbrev: 'CHI'}, home: {name: 'Philadelphia Eagles', abbrev: 'PHI'}, time: '3:00p ET', tv: 'Prime Video'},
        {date: '30-Nov-25', day: 'Sunday', away: {name: 'Los Angeles Rams', abbrev: 'LAR'}, home: {name: 'Carolina Panthers', abbrev: 'CAR'}, time: '1:00p ET', tv: 'FOX'},
        {date: '30-Nov-25', day: 'Sunday', away: {name: 'San Francisco 49ers', abbrev: 'SF'}, home: {name: 'Cleveland Browns', abbrev: 'CLE'}, time: '1:00p ET', tv: 'CBS'},
        {date: '30-Nov-25', day: 'Sunday', away: {name: 'Houston Texans', abbrev: 'HOU'}, home: {name: 'Indianapolis Colts', abbrev: 'IND'}, time: '1:00p ET', tv: 'CBS'},
        {date: '30-Nov-25', day: 'Sunday', away: {name: 'New Orleans Saints', abbrev: 'NO'}, home: {name: 'Miami Dolphins', abbrev: 'MIA'}, time: '1:00p ET', tv: 'FOX'},
        {date: '30-Nov-25', day: 'Sunday', away: {name: 'Atlanta Falcons', abbrev: 'ATL'}, home: {name: 'New York Jets', abbrev: 'NYJ'}, time: '1:00p ET', tv: 'FOX'},
        {date: '30-Nov-25', day: 'Sunday', away: {name: 'Arizona Cardinals', abbrev: 'ARI'}, home: {name: 'Tampa Bay Buccaneers', abbrev: 'TB'}, time: '1:00p ET', tv: 'FOX'},
        {date: '30-Nov-25', day: 'Sunday', away: {name: 'Jacksonville Jaguars', abbrev: 'JAX'}, home: {name: 'Tennessee Titans', abbrev: 'TEN'}, time: '1:00p ET', tv: 'CBS'},
        {date: '30-Nov-25', day: 'Sunday', away: {name: 'Minnesota Vikings', abbrev: 'MIN'}, home: {name: 'Seattle Seahawks', abbrev: 'SEA'}, time: '4:05p ET', tv: 'FOX'},
        {date: '30-Nov-25', day: 'Sunday', away: {name: 'Las Vegas Raiders', abbrev: 'LV'}, home: {name: 'Los Angeles Chargers', abbrev: 'LAC'}, time: '4:25p ET', tv: 'CBS'},
        {date: '30-Nov-25', day: 'Sunday', away: {name: 'Buffalo Bills', abbrev: 'BUF'}, home: {name: 'Pittsburgh Steelers', abbrev: 'PIT'}, time: '4:25p ET', tv: 'CBS'},
        {date: '30-Nov-25', day: 'Sunday', away: {name: 'Denver Broncos', abbrev: 'DEN'}, home: {name: 'Washington Commanders', abbrev: 'WAS'}, time: '8:20p ET', tv: 'NBC'},
        {date: '1-Dec-25', day: 'Monday', away: {name: 'New York Giants', abbrev: 'NYG'}, home: {name: 'New England Patriots', abbrev: 'NE'}, time: '8:15p ET', tv: 'ESPN'},
    ],
    [ // Week 14
        {date: '4-Dec-25', day: 'Thursday', away: {name: 'Dallas Cowboys', abbrev: 'DAL'}, home: {name: 'Detroit Lions', abbrev: 'DET'}, time: '8:15p ET', tv: 'Prime Video'},
        {date: '7-Dec-25', day: 'Sunday', away: {name: 'Seattle Seahawks', abbrev: 'SEA'}, home: {name: 'Atlanta Falcons', abbrev: 'ATL'}, time: '1:00p ET', tv: 'FOX'},
        {date: '7-Dec-25', day: 'Sunday', away: {name: 'Pittsburgh Steelers', abbrev: 'PIT'}, home: {name: 'Baltimore Ravens', abbrev: 'BAL'}, time: '1:00p ET', tv: 'CBS'},
        {date: '7-Dec-25', day: 'Sunday', away: {name: 'Tennessee Titans', abbrev: 'TEN'}, home: {name: 'Cleveland Browns', abbrev: 'CLE'}, time: '1:00p ET', tv: 'FOX'},
        {date: '7-Dec-25', day: 'Sunday', away: {name: 'Chicago Bears', abbrev: 'CHI'}, home: {name: 'Green Bay Packers', abbrev: 'GB'}, time: '1:00p ET', tv: 'FOX'},
        {date: '7-Dec-25', day: 'Sunday', away: {name: 'Indianapolis Colts', abbrev: 'IND'}, home: {name: 'Jacksonville Jaguars', abbrev: 'JAX'}, time: '1:00p ET', tv: 'CBS'},
        {date: '7-Dec-25', day: 'Sunday', away: {name: 'Washington Commanders', abbrev: 'WAS'}, home: {name: 'Minnesota Vikings', abbrev: 'MIN'}, time: '1:00p ET', tv: 'FOX'},
        {date: '7-Dec-25', day: 'Sunday', away: {name: 'Miami Dolphins', abbrev: 'MIA'}, home: {name: 'New York Jets', abbrev: 'NYJ'}, time: '1:00p ET', tv: 'CBS'},
        {date: '7-Dec-25', day: 'Sunday', away: {name: 'New Orleans Saints', abbrev: 'NO'}, home: {name: 'Tampa Bay Buccaneers', abbrev: 'TB'}, time: '1:00p ET', tv: 'CBS'},
        {date: '7-Dec-25', day: 'Sunday', away: {name: 'Denver Broncos', abbrev: 'DEN'}, home: {name: 'Las Vegas Raiders', abbrev: 'LV'}, time: '4:05p ET', tv: 'CBS'},
        {date: '7-Dec-25', day: 'Sunday', away: {name: 'Los Angeles Rams', abbrev: 'LAR'}, home: {name: 'Arizona Cardinals', abbrev: 'ARI'}, time: '4:25p ET', tv: 'FOX'},
        {date: '7-Dec-25', day: 'Sunday', away: {name: 'Cincinnati Bengals', abbrev: 'CIN'}, home: {name: 'Buffalo Bills', abbrev: 'BUF'}, time: '4:25p ET', tv: 'FOX'},
        {date: '7-Dec-25', day: 'Sunday', away: {name: 'Houston Texans', abbrev: 'HOU'}, home: {name: 'Kansas City Chiefs', abbrev: 'KC'}, time: '8:20p ET', tv: 'NBC'},
        {date: '8-Dec-25', day: 'Monday', away: {name: 'Philadelphia Eagles', abbrev: 'PHI'}, home: {name: 'Los Angeles Chargers', abbrev: 'LAC'}, time: '8:15p ET', tv: 'ESPN/ABC'},
    ],
    [ // Week 15
        {date: '11-Dec-25', day: 'Thursday', away: {name: 'Atlanta Falcons', abbrev: 'ATL'}, home: {name: 'Tampa Bay Buccaneers', abbrev: 'TB'}, time: '8:15p ET', tv: 'Prime Video'},
        {date: '14-Dec-25', day: 'Sunday', away: {name: 'Cleveland Browns', abbrev: 'CLE'}, home: {name: 'Chicago Bears', abbrev: 'CHI'}, time: '1:00p ET', tv: 'FOX'},
        {date: '14-Dec-25', day: 'Sunday', away: {name: 'Baltimore Ravens', abbrev: 'BAL'}, home: {name: 'Cincinnati Bengals', abbrev: 'CIN'}, time: '1:00p ET', tv: 'CBS'},
        {date: '14-Dec-25', day: 'Sunday', away: {name: 'Arizona Cardinals', abbrev: 'ARI'}, home: {name: 'Houston Texans', abbrev: 'HOU'}, time: '1:00p ET', tv: 'FOX'},
        {date: '14-Dec-25', day: 'Sunday', away: {name: 'New York Jets', abbrev: 'NYJ'}, home: {name: 'Jacksonville Jaguars', abbrev: 'JAX'}, time: '1:00p ET', tv: 'CBS'},
        {date: '14-Dec-25', day: 'Sunday', away: {name: 'Los Angeles Chargers', abbrev: 'LAC'}, home: {name: 'Kansas City Chiefs', abbrev: 'KC'}, time: '1:00p ET', tv: 'CBS'},
        {date: '14-Dec-25', day: 'Sunday', away: {name: 'Buffalo Bills', abbrev: 'BUF'}, home: {name: 'New England Patriots', abbrev: 'NE'}, time: '1:00p ET', tv: 'CBS'},
        {date: '14-Dec-25', day: 'Sunday', away: {name: 'Washington Commanders', abbrev: 'WAS'}, home: {name: 'New York Giants', abbrev: 'NYG'}, time: '1:00p ET', tv: 'FOX'},
        {date: '14-Dec-25', day: 'Sunday', away: {name: 'Las Vegas Raiders', abbrev: 'LV'}, home: {name: 'Philadelphia Eagles', abbrev: 'PHI'}, time: '1:00p ET', tv: 'FOX'},
        {date: '14-Dec-25', day: 'Sunday', away: {name: 'Green Bay Packers', abbrev: 'GB'}, home: {name: 'Denver Broncos', abbrev: 'DEN'}, time: '4:25p ET', tv: 'CBS'},
        {date: '14-Dec-25', day: 'Sunday', away: {name: 'Detroit Lions', abbrev: 'DET'}, home: {name: 'Los Angeles Rams', abbrev: 'LAR'}, time: '4:25p ET', tv: 'FOX'},
        {date: '14-Dec-25', day: 'Sunday', away: {name: 'Carolina Panthers', abbrev: 'CAR'}, home: {name: 'New Orleans Saints', abbrev: 'NO'}, time: '4:25p ET', tv: 'FOX'},
        {date: '14-Dec-25', day: 'Sunday', away: {name: 'Indianapolis Colts', abbrev: 'IND'}, home: {name: 'Seattle Seahawks', abbrev: 'SEA'}, time: '4:25p ET', tv: 'CBS'},
        {date: '14-Dec-25', day: 'Sunday', away: {name: 'Tennessee Titans', abbrev: 'TEN'}, home: {name: 'San Francisco 49ers', abbrev: 'SF'}, time: '4:25p ET', tv: 'FOX'},
        {date: '14-Dec-25', day: 'Sunday', away: {name: 'Minnesota Vikings', abbrev: 'MIN'}, home: {name: 'Dallas Cowboys', abbrev: 'DAL'}, time: '8:20p ET', tv: 'NBC'},
        {date: '15-Dec-25', day: 'Monday', away: {name: 'Miami Dolphins', abbrev: 'MIA'}, home: {name: 'Pittsburgh Steelers', abbrev: 'PIT'}, time: '8:15p ET', tv: 'ESPN/ABC'},
    ],
    [ // Week 16
        {date: '18-Dec-25', day: 'Thursday', away: {name: 'Los Angeles Rams', abbrev: 'LAR'}, home: {name: 'Seattle Seahawks', abbrev: 'SEA'}, time: '8:15p ET', tv: 'Prime Video'},
        {date: 'TBD', day: 'TBD', away: {name: 'Green Bay Packers', abbrev: 'GB'}, home: {name: 'Chicago Bears', abbrev: 'CHI'}, time: 'TBD', tv: 'FOX'},
        {date: 'TBD', day: 'TBD', away: {name: 'Philadelphia Eagles', abbrev: 'PHI'}, home: {name: 'Washington Commanders', abbrev: 'WAS'}, time: 'TBD', tv: 'FOX'},
        {date: '21-Dec-25', day: 'Sunday', away: {name: 'New England Patriots', abbrev: 'NE'}, home: {name: 'Baltimore Ravens', abbrev: 'BAL'}, time: '1:00p ET', tv: 'CBS'},
        {date: '21-Dec-25', day: 'Sunday', away: {name: 'Tampa Bay Buccaneers', abbrev: 'TB'}, home: {name: 'Carolina Panthers', abbrev: 'CAR'}, time: '1:00p ET', tv: 'FOX'},
        {date: '21-Dec-25', day: 'Sunday', away: {name: 'Buffalo Bills', abbrev: 'BUF'}, home: {name: 'Cleveland Browns', abbrev: 'CLE'}, time: '1:00p ET', tv: 'CBS'},
        {date: '21-Dec-25', day: 'Sunday', away: {name: 'Los Angeles Chargers', abbrev: 'LAC'}, home: {name: 'Dallas Cowboys', abbrev: 'DAL'}, time: '1:00p ET', tv: 'FOX'},
        {date: '21-Dec-25', day: 'Sunday', away: {name: 'New York Jets', abbrev: 'NYJ'}, home: {name: 'New Orleans Saints', abbrev: 'NO'}, time: '1:00p ET', tv: 'CBS'},
        {date: '21-Dec-25', day: 'Sunday', away: {name: 'Minnesota Vikings', abbrev: 'MIN'}, home: {name: 'New York Giants', abbrev: 'NYG'}, time: '1:00p ET', tv: 'FOX'},
        {date: '21-Dec-25', day: 'Sunday', away: {name: 'Kansas City Chiefs', abbrev: 'KC'}, home: {name: 'Tennessee Titans', abbrev: 'TEN'}, time: '1:00p ET', tv: 'CBS'},
        {date: '21-Dec-25', day: 'Sunday', away: {name: 'Atlanta Falcons', abbrev: 'ATL'}, home: {name: 'Arizona Cardinals', abbrev: 'ARI'}, time: '4:05p ET', tv: 'FOX'},
        {date: '21-Dec-25', day: 'Sunday', away: {name: 'Jacksonville Jaguars', abbrev: 'JAX'}, home: {name: 'Denver Broncos', abbrev: 'DEN'}, time: '4:05p ET', tv: 'FOX'},
        {date: '21-Dec-25', day: 'Sunday', away: {name: 'Pittsburgh Steelers', abbrev: 'PIT'}, home: {name: 'Detroit Lions', abbrev: 'DET'}, time: '4:25p ET', tv: 'CBS'},
        {date: '21-Dec-25', day: 'Sunday', away: {name: 'Las Vegas Raiders', abbrev: 'LV'}, home: {name: 'Houston Texans', abbrev: 'HOU'}, time: '4:25p ET', tv: 'CBS'},
        {date: '21-Dec-25', day: 'Sunday', away: {name: 'Cincinnati Bengals', abbrev: 'CIN'}, home: {name: 'Miami Dolphins', abbrev: 'MIA'}, time: '8:20p ET', tv: 'NBC'},
        {date: '22-Dec-25', day: 'Monday', away: {name: 'San Francisco 49ers', abbrev: 'SF'}, home: {name: 'Indianapolis Colts', abbrev: 'IND'}, time: '8:15p ET', tv: 'ESPN'},
    ],
    [ // Week 17
        {date: '25-Dec-25', day: 'Thursday', away: {name: 'Dallas Cowboys', abbrev: 'DAL'}, home: {name: 'Washington Commanders', abbrev: 'WAS'}, time: '1:00p ET', tv: 'NETFLIX'},
        {date: '25-Dec-25', day: 'Thursday', away: {name: 'Detroit Lions', abbrev: 'DET'}, home: {name: 'Minnesota Vikings', abbrev: 'MIN'}, time: '4:30p ET', tv: 'NETFLIX'},
        {date: '25-Dec-25', day: 'Thursday', away: {name: 'Denver Broncos', abbrev: 'DEN'}, home: {name: 'Kansas City Chiefs', abbrev: 'KC'}, time: '8:15p ET', tv: 'Prime Video'},
        {date: '27-Dec-25', day: 'Saturday', away: {name: 'Seattle Seahawks', abbrev: 'SEA'}, home: {name: 'Carolina Panthers', abbrev: 'CAR'}, time: 'TBD', tv: 'TBD'},
        {date: '27-Dec-25', day: 'Saturday', away: {name: 'Arizona Cardinals', abbrev: 'ARI'}, home: {name: 'Cincinnati Bengals', abbrev: 'CIN'}, time: 'TBD', tv: 'TBD'},
        {date: '27-Dec-25', day: 'Saturday', away: {name: 'Baltimore Ravens', abbrev: 'BAL'}, home: {name: 'Green Bay Packers', abbrev: 'GB'}, time: 'TBD', tv: 'TBD'},
        {date: '27-Dec-25', day: 'Saturday', away: {name: 'Houston Texans', abbrev: 'HOU'}, home: {name: 'Los Angeles Chargers', abbrev: 'LAC'}, time: 'TBD', tv: 'TBD'},
        {date: '27-Dec-25', day: 'Saturday', away: {name: 'New York Giants', abbrev: 'NYG'}, home: {name: 'Las Vegas Raiders', abbrev: 'LV'}, time: 'TBD', tv: 'TBD'},
        {date: '28-Dec-25', day: 'Sunday', away: {name: 'Pittsburgh Steelers', abbrev: 'PIT'}, home: {name: 'Cleveland Browns', abbrev: 'CLE'}, time: '1:00p ET', tv: 'CBS'},
        {date: '28-Dec-25', day: 'Sunday', away: {name: 'Jacksonville Jaguars', abbrev: 'JAX'}, home: {name: 'Indianapolis Colts', abbrev: 'IND'}, time: '1:00p ET', tv: 'FOX'},
        {date: '28-Dec-25', day: 'Sunday', away: {name: 'Tampa Bay Buccaneers', abbrev: 'TB'}, home: {name: 'Miami Dolphins', abbrev: 'MIA'}, time: '1:00p ET', tv: 'FOX'},
        {date: '28-Dec-25', day: 'Sunday', away: {name: 'New England Patriots', abbrev: 'NE'}, home: {name: 'New York Jets', abbrev: 'NYJ'}, time: '1:00p ET', tv: 'CBS'},
        {date: '28-Dec-25', day: 'Sunday', away: {name: 'New Orleans Saints', abbrev: 'NO'}, home: {name: 'Tennessee Titans', abbrev: 'TEN'}, time: '1:00p ET', tv: 'CBS'},
        {date: '28-Dec-25', day: 'Sunday', away: {name: 'Philadelphia Eagles', abbrev: 'PHI'}, home: {name: 'Buffalo Bills', abbrev: 'BUF'}, time: '4:25p ET', tv: 'FOX'},
        {date: '28-Dec-25', day: 'Sunday', away: {name: 'Chicago Bears', abbrev: 'CHI'}, home: {name: 'San Francisco 49ers', abbrev: 'SF'}, time: '8:20p ET', tv: 'NBC'},
        {date: '29-Dec-25', day: 'Monday', away: {name: 'Los Angeles Rams', abbrev: 'LAR'}, home: {name: 'Atlanta Falcons', abbrev: 'ATL'}, time: '8:15p ET', tv: 'ESPN'},
    ],
    [ // Week 18
        {date: 'TBD (January 3 or 4, 2026)', day: 'TBD', away: {name: 'New Orleans Saints', abbrev: 'NO'}, home: {name: 'Atlanta Falcons', abbrev: 'ATL'}, time: 'TBD', tv: 'TBD'},
        {date: 'TBD (January 3 or 4, 2026)', day: 'TBD', away: {name: 'New York Jets', abbrev: 'NYJ'}, home: {name: 'Buffalo Bills', abbrev: 'BUF'}, time: 'TBD', tv: 'TBD'},
        {date: 'TBD (January 3 or 4, 2026)', day: 'TBD', away: {name: 'Detroit Lions', abbrev: 'DET'}, home: {name: 'Chicago Bears', abbrev: 'CHI'}, time: 'TBD', tv: 'TBD'},
        {date: 'TBD (January 3 or 4, 2026)', day: 'TBD', away: {name: 'Cleveland Browns', abbrev: 'CLE'}, home: {name: 'Cincinnati Bengals', abbrev: 'CIN'}, time: 'TBD', tv: 'TBD'},
        {date: 'TBD (January 3 or 4, 2026)', day: 'TBD', away: {name: 'Los Angeles Chargers', abbrev: 'LAC'}, home: {name: 'Denver Broncos', abbrev: 'DEN'}, time: 'TBD', tv: 'TBD'},
        {date: 'TBD (January 3 or 4, 2026)', day: 'TBD', away: {name: 'Indianapolis Colts', abbrev: 'IND'}, home: {name: 'Houston Texans', abbrev: 'HOU'}, time: 'TBD', tv: 'TBD'},
        {date: 'TBD (January 3 or 4, 2026)', day: 'TBD', away: {name: 'Tennessee Titans', abbrev: 'TEN'}, home: {name: 'Jacksonville Jaguars', abbrev: 'JAX'}, time: 'TBD', tv: 'TBD'},
        {date: 'TBD (January 3 or 4, 2026)', day: 'TBD', away: {name: 'Arizona Cardinals', abbrev: 'ARI'}, home: {name: 'Los Angeles Rams', abbrev: 'LAR'}, time: 'TBD', tv: 'TBD'},
        {date: 'TBD (January 3 or 4, 2026)', day: 'TBD', away: {name: 'Kansas City Chiefs', abbrev: 'KC'}, home: {name: 'Las Vegas Raiders', abbrev: 'LV'}, time: 'TBD', tv: 'TBD'},
        {date: 'TBD (January 3 or 4, 2026)', day: 'TBD', away: {name: 'Green Bay Packers', abbrev: 'GB'}, home: {name: 'Minnesota Vikings', abbrev: 'MIN'}, time: 'TBD', tv: 'TBD'},
        {date: 'TBD (January 3 or 4, 2026)', day: 'TBD', away: {name: 'Miami Dolphins', abbrev: 'MIA'}, home: {name: 'New England Patriots', abbrev: 'NE'}, time: 'TBD', tv: 'TBD'},
        {date: 'TBD (January 3 or 4, 2026)', day: 'TBD', away: {name: 'Dallas Cowboys', abbrev: 'DAL'}, home: {name: 'New York Giants', abbrev: 'NYG'}, time: 'TBD', tv: 'TBD'},
        {date: 'TBD (January 3 or 4, 2026)', day: 'TBD', away: {name: 'Washington Commanders', abbrev: 'WAS'}, home: {name: 'Philadelphia Eagles', abbrev: 'PHI'}, time: 'TBD', tv: 'TBD'},
        {date: 'TBD (January 3 or 4, 2026)', day: 'TBD', away: {name: 'Baltimore Ravens', abbrev: 'BAL'}, home: {name: 'Pittsburgh Steelers', abbrev: 'PIT'}, time: 'TBD', tv: 'TBD'},
        {date: 'TBD (January 3 or 4, 2026)', day: 'TBD', away: {name: 'Seattle Seahawks', abbrev: 'SEA'}, home: {name: 'San Francisco 49ers', abbrev: 'SF'}, time: 'TBD', tv: 'TBD'},
        {date: 'TBD (January 3 or 4, 2026)', day: 'TBD', away: {name: 'Carolina Panthers', abbrev: 'CAR'}, home: {name: 'Tampa Bay Buccaneers', abbrev: 'TB'}, time: 'TBD', tv: 'TBD'},
    ],
];

document.addEventListener('DOMContentLoaded', function () {
    // ---- PLAYERS ARRAY - MATCHES THE GLOBAL PLAYERS ARRAY ----
    // Using the same player list as defined at the top of the file
    const PLAYER_CONFIGS = PLAYERS.map(playerName => ({
        id: playerName,
        name: playerName
    }));
    // -----------------------------------------------------------

    // Helper: always return the string key used by KV
    const playerKey = (p) => (typeof p === 'string' ? p : (p?.id || p?.name || ''));

    const weekSelector      = document.getElementById('weekSelector');
    const playerSelector    = document.getElementById('playerSelector');
    const saveButton        = document.getElementById('saveButton');
    const gamesContainer    = document.getElementById('gamesContainer');
    const consensusButtons  = document.getElementById('consensusButtons');
    const consensusDisplay  = document.getElementById('consensusDisplay');

    let currentWeek  = null;
    let currentPlayer = null; // will hold the player **id** (string)
    let picks = [];
    let usedTeams = new Set();

    // Populate players dropdown from PLAYER_CONFIGS
    if (playerSelector) {
        playerSelector.innerHTML = '<option value="">-- Select Player --</option>';
        for (const p of PLAYER_CONFIGS) {
            const opt = document.createElement('option');
            opt.value = p.id;   // store the KV key in value
            opt.textContent = p.name;
            playerSelector.appendChild(opt);
        }
    }

    // Populate weeks
    for (let i = 1; i <= 18; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Week ${i}`;
        weekSelector.appendChild(option);
    }

    // Populate consensus buttons
    for (let i = 1; i <= 18; i++) {
        const btn = document.createElement('button');
        btn.classList.add('btn', 'btn-secondary', 'consensus-btn');
        btn.textContent = `Week ${i}`;
        btn.onclick = () => computeConsensus(i);
        consensusButtons.appendChild(btn);
    }

    weekSelector.addEventListener('change', async () => {
        currentWeek = parseInt(weekSelector.value, 10);
        if (currentWeek && currentPlayer) {
            picks = Array.from({ length: SCHEDULE[currentWeek].length }, () => ({ loser: null, confidence: null }));
            usedTeams = await getUsedTeams(currentPlayer, currentWeek);
            loadWeek();
            await loadPicks(currentPlayer, currentWeek);
        }
    });

    playerSelector.addEventListener('change', async () => {
        // value already holds the KV key (id)
        currentPlayer = playerSelector.value || null;
        if (currentWeek && currentPlayer) {
            picks = Array.from({ length: SCHEDULE[currentWeek].length }, () => ({ loser: null, confidence: null }));
            usedTeams = await getUsedTeams(currentPlayer, currentWeek);
            loadWeek();
            await loadPicks(currentPlayer, currentWeek);
        }
    });

    saveButton.addEventListener('click', savePicks);

    function loadWeek() {
        gamesContainer.innerHTML = '';
        const numGames = SCHEDULE[currentWeek].length;
        SCHEDULE[currentWeek].forEach((game, index) => {
            const card = document.createElement('div');
            card.classList.add('game-card');
            card.innerHTML = `
                <div class="game-info">${game.day} ${game.date} - ${game.time} on ${game.tv}</div>
                <div class="team-container">
                    <div class="team" data-team="${game.away.abbrev}">
                        <img src="https://a.espncdn.com/i/teamlogos/nfl/500/${game.away.abbrev.toLowerCase()}.png" alt="${game.away.name}">
                        <div>${game.away.name}</div>
                    </div>
                    <span class="vs">@</span>
                    <div class="team" data-team="${game.home.abbrev}">
                        <img src="https://a.espncdn.com/i/teamlogos/nfl/500/${game.home.abbrev.toLowerCase()}.png" alt="${game.home.name}">
                        <div>${game.home.name}</div>
                    </div>
                </div>
                <div class="confidence-container">
                    Confidence: 
                    <select class="form-select confidence-select" data-index="${index}">
                        <option value="">-- Select --</option>
                    </select>
                </div>
            `;
            gamesContainer.appendChild(card);

            const select = card.querySelector('.confidence-select');
            for (let i = 1; i <= numGames; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                select.appendChild(option);
            }

            const teams = card.querySelectorAll('.team');
            teams.forEach((t, isAway) => {
                const abbrev = t.dataset.team;
                if (usedTeams.has(abbrev)) {
                    t.classList.add('disabled');
                } else {
                    t.addEventListener('click', () => selectLoser(index, abbrev, isAway === 0));
                }
            });
        });

        const selects = document.querySelectorAll('.confidence-select');
        selects.forEach(s => s.addEventListener('change', () => {
            const index = parseInt(s.dataset.index, 10);
            picks[index].confidence = parseInt(s.value || '0', 10) || null;
            updateConfidences();
        }));
    }

    function selectLoser(gameIndex, abbrev, isAway) {
        const gameCard = gamesContainer.children[gameIndex];
        const teams = gameCard.querySelectorAll('.team');
        teams.forEach(t => t.classList.remove('selected'));
        teams[isAway ? 0 : 1].classList.add('selected');
        picks[gameIndex].loser = abbrev;
    }

    function updateConfidences() {
        const selects = document.querySelectorAll('.confidence-select');
        const used = new Set();
        selects.forEach(s => {
            const val = parseInt(s.value, 10);
            if (val) used.add(val);
        });
        selects.forEach(s => {
            const currentVal = parseInt(s.value || '0', 10);
            Array.from(s.options).forEach(opt => {
                if (opt.value === '') return;
                const val = parseInt(opt.value, 10);
                opt.disabled = used.has(val) && val !== currentVal;
            });
        });
    }

    async function getUsedTeams(playerId, week) {
        const used = new Set();
        for (let w = 1; w < week; w++) {
            const str = await fetchPicks(playerId, w);
            if (str) {
                const parsed = parsePicksString(str);
                const maxPick = parsed.reduce((max, cur) => cur.confidence > max.confidence ? cur : max, parsed[0]);
                used.add(maxPick.team);
            }
        }
        return used;
    }

    async function fetchPicks(playerId, week) {
        try {
            const response = await fetch(`${API_URL}/get-picks?player=${encodeURIComponent(playerId)}&week=${week}`);
            if (response.ok) {
                return await response.text();
            }
        } catch (e) {
            // swallow network errors; return null like before
        }
        return null;
    }

    async function loadPicks(playerId, week) {
        const str = await fetchPicks(playerId, week);
        if (!str) return;
        const parsed = parsePicksString(str);
        parsed.forEach(p => {
            const gameCard = gamesContainer.children[p.index];
            if (!gameCard) return;
            const teams = gameCard.querySelectorAll('.team');
            teams.forEach(t => {
                if (t.dataset.team === p.team) t.classList.add('selected');
            });
            const select = gameCard.querySelector('.confidence-select');
            if (select) {
                select.value = p.confidence;
                picks[p.index] = { loser: p.team, confidence: p.confidence };
            }
        });
        updateConfidences();
    }

    function parsePicksString(str) {
        // format: "0:PHI:8|1:LAC:6|2:ATL:9|..."
        return str.split('|').map(part => {
            const [idx, team, conf] = part.split(':');
            return { index: parseInt(idx, 10), team, confidence: parseInt(conf, 10) };
        });
    }

    function validatePicks() {
        const losers = picks.map(p => p.loser);
        const confs = picks.map(p => p.confidence);
        if (losers.some(l => !l)) return 'Select a loser for every game.';
        if (new Set(losers).size !== losers.length) return 'Cannot select the same team multiple times.';
        if (confs.some(c => !c || c < 1 || c > picks.length)) return 'Invalid confidence values.';
        const uniqueConfs = new Set(confs);
        if (uniqueConfs.size !== picks.length) return 'Confidences must be unique from 1 to ' + picks.length + '.';
        for (const l of losers) {
            if (usedTeams.has(l)) return 'Cannot select already used team: ' + l;
        }
        return null;
    }

    async function savePicks() {
        const error = validatePicks();
        if (error) {
            alert(error);
            return;
        }
        const picksString = picks.map((p, i) => `${i}:${p.loser}:${p.confidence}`).join('|');
        try {
            const response = await fetch(
                `${API_URL}/save-picks?player=${encodeURIComponent(currentPlayer)}&week=${currentWeek}`,
                { method: 'POST', body: picksString }
            );
            if (response.ok) {
                alert('Picks saved!');
                const maxPick = picks.reduce((max, p) => p.confidence > max.confidence ? p : max, picks[0]);
                usedTeams.add(maxPick.loser);
                loadWeek(); // Reload to update disabled teams
                await loadPicks(currentPlayer, currentWeek); // Reload picks to reflect saved state
            } else {
                alert('Failed to save picks.');
            }
        } catch (e) {
            alert('Error saving picks.');
        }
    }

    // Fixed: use the correct PLAYER_CONFIGS array when computing consensus
    async function computeConsensus(week) {
        const display = document.getElementById('consensusDisplay');
        display.innerHTML = '';

        // Add debugging to see what's happening
        console.log(`Computing consensus for week ${week}...`);
        console.log('Checking players:', PLAYER_CONFIGS.map(p => p.id));

        const allPicks = await Promise.all(
            PLAYER_CONFIGS.map(async p => {
                const picks = await fetchPicks(p.id, week);
                console.log(`${p.name} (${p.id}) picks:`, picks);
                return picks;
            })
        );

        const highPicks = allPicks
            .map(str => {
                if (!str) return null;
                const parsed = parsePicksString(str);
                return parsed.reduce((max, cur) => cur.confidence > max.confidence ? cur : max, parsed[0]);
            })
            .filter(Boolean);

        console.log('High confidence picks found:', highPicks);

        if (highPicks.length === 0) {
            display.textContent = `No consensus yet for Week ${week}`;
            return;
        }

        const tally = {};
        highPicks.forEach(p => {
            if (!tally[p.team]) tally[p.team] = { votes: 0, totalConf: 0 };
            tally[p.team].votes++;
            tally[p.team].totalConf += p.confidence;
        });

        let consensus = Object.keys(tally).reduce((a, b) => {
            if (tally[a].votes > tally[b].votes) return a;
            if (tally[b].votes > tally[a].votes) return b;
            const avgA = tally[a].totalConf / tally[a].votes;
            const avgB = tally[b].totalConf / tally[b].votes;
            return avgA > avgB ? a : b;
        });

        const { votes, totalConf } = tally[consensus];
        const avg = (totalConf / votes).toFixed(2);
        const teamName = Object.keys(TEAM_ABBREV).find(k => TEAM_ABBREV[k] === consensus) || consensus;

        display.textContent = `Consensus for Week ${week}: ${teamName} (${consensus}) - ${votes} votes, avg conf ${avg}`;
    }
});