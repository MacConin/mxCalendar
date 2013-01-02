<?php

$isLimit = !empty($scriptProperties['limit']);
$start = $modx->getOption('start',$scriptProperties,0);
$limit = $modx->getOption('limit',$scriptProperties,10);
$sort = $modx->getOption('sort',$scriptProperties,'name');
$dir = $modx->getOption('dir',$scriptProperties,'ASC');
$query = $modx->getOption('query',$scriptProperties,'');

/* build query */
$c = $modx->newQuery('mxCalendarLocations');
if (!empty($query)) {
    $c->where(array(
        'name:LIKE' => '%'.$query.'%',
        'OR:description:LIKE' => '%'.$query.'%',
    ));
}
$count = $modx->getCount('mxCalendarLocations',$c);
$c->sortby($sort,$dir);
if ($isLimit) $c->limit($limit,$start);
$mxcalendarsLocs = $modx->getIterator('mxCalendarLocations', $c);

/* iterate */
$list = array();
foreach ($mxcalendarsLocs as $mxc) {
    $mxcArray = $mxc->toArray();
    $list[]= $mxcArray;
}
return $this->outputArray($list,$count);

?>
