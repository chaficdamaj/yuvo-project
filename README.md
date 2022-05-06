# yuvo project
 SQL COMMAND:
 #when loading the data
 
 create table aggregated_hourly(
    _TIME datetime,
    nealias varchar(255),
    netype varchar(255),
    link varchar(255),
    slot varchar(255),
    maxRXlevel float,
    maxTXlevel float,
    RSLDeviation float
    );
  CREATE TABLE chaficdamaj.aggregated_daily
(
    _TIME timestamp,
    nealias varchar(255),
    netype varchar(255),
    link varchar(255),
    slot varchar(255),
    maxRXlevel float,
    maxTXlevel float,
    RSLDeviation float
);


CREATE PROJECTION chaficdamaj.aggregated_daily /*+createtype(L)*/ 
(
 _TIME,
 nealias,
 netype,
 link,
 slot,
 maxRXlevel,
 maxTXlevel,
 RSLDeviation
)
AS
 SELECT aggregated_daily._TIME,
        aggregated_daily.nealias,
        aggregated_daily.netype,
        aggregated_daily.link,
        aggregated_daily.slot,
        aggregated_daily.maxRXlevel,
        aggregated_daily.maxTXlevel,
        aggregated_daily.RSLDeviation
 FROM chaficdamaj.aggregated_daily
 ORDER BY aggregated_daily._TIME,
          aggregated_daily.nealias,
          aggregated_daily.netype,
          aggregated_daily.link,
          aggregated_daily.slot
SEGMENTED BY hash(aggregated_daily._TIME, aggregated_daily.nealias, aggregated_daily.netype, aggregated_daily.link, aggregated_daily.slot) ALL NODES KSAFE 1;


SELECT MARK_DESIGN_KSAFE(1);
CREATE TABLE chaficdamaj.dataLoader
(
    network_SID int,
    _dateTime timestamp,
    NEID float,
    _Object varchar(255),
    _time timestamp,
    _interval int,
    direction varchar(255),
    nealias varchar(255),
    netype varchar(255),
    rxlevelbelowts1 varchar(255),
    rxlevelbelowts2 varchar(255),
    minrxlevel float,
    maxrxlevel float,
    txlevelbocets1 int,
    mintxlevel float,
    maxtxlevel float,
    failuredescription varchar(255),
    link varchar(255),
    TID varchar(255),
    farendtid varchar(255),
    slot varchar(255),
    port varchar(255)
);


CREATE PROJECTION chaficdamaj.dataLoader /*+createtype(L)*/ 
(
 network_SID,
 _dateTime,
 NEID,
 _Object,
 _time,
 _interval,
 direction,
 nealias,
 netype,
 rxlevelbelowts1,
 rxlevelbelowts2,
 minrxlevel,
 maxrxlevel,
 txlevelbocets1,
 mintxlevel,
 maxtxlevel,
 failuredescription,
 link,
 TID,
 farendtid,
 slot,
 port
)
AS
 SELECT dataLoader.network_SID,
        dataLoader._dateTime,
        dataLoader.NEID,
        dataLoader._Object,
        dataLoader._time,
        dataLoader._interval,
        dataLoader.direction,
        dataLoader.nealias,
        dataLoader.netype,
        dataLoader.rxlevelbelowts1,
        dataLoader.rxlevelbelowts2,
        dataLoader.minrxlevel,
        dataLoader.maxrxlevel,
        dataLoader.txlevelbocets1,
        dataLoader.mintxlevel,
        dataLoader.maxtxlevel,
        dataLoader.failuredescription,
        dataLoader.link,
        dataLoader.TID,
        dataLoader.farendtid,
        dataLoader.slot,
        dataLoader.port
 FROM chaficdamaj.dataLoader
 ORDER BY dataLoader.network_SID,
          dataLoader._dateTime,
          dataLoader.NEID,
          dataLoader._Object,
          dataLoader._time,
          dataLoader._interval,
          dataLoader.direction,
          dataLoader.nealias
SEGMENTED BY hash(dataLoader.network_SID, dataLoader._dateTime, dataLoader.NEID, dataLoader._time, dataLoader._interval, dataLoader.minrxlevel, dataLoader.maxrxlevel, dataLoader.txlevelbocets1) ALL NODES KSAFE 1;


SELECT MARK_DESIGN_KSAFE(1);


