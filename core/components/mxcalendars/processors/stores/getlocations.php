<?php

if (!$modx->user->isAuthenticated('mgr')) return $modx->error->failure($modx->lexicon('permission_denied'));

$query = $modx->getOption('query',$scriptProperties,'');

/* build query */
$c = $modx->newQuery('mxCalendarLocations');

$c->select(array(
	'mxCalendarLocations.id',
	'mxCalendarLocations.name',
	'mxCalendarLocations.zip',
	'mxCalendarLocations.place',
	'mxCalendarLocations.link'
	
));

$c->where(array(
	//'name:LIKE' => '%'.$query.'%',
	'disable' => 0,
	'active' => 1,
));

$c->sortby('isdefault','ASC');
$c->sortby('name','ASC');
$categories = $modx->getCollection('mxCalendarLocations', $c);

/* iterate */
$list = array();
foreach ($categories as $mxc) {
    $list[] = $mxc->toArray();
}
return $this->outputArray($list,sizeof($list));



