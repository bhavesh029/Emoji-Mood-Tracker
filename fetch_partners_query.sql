with json_d as (
select '
{
"MON":[{"startTime":"10:00","endTime":"12:00"},{"startTime":"14:00","endTime":"18:00"}],
"TUE":[{"startTime":"10:00","endTime":"12:00"},{"startTime":"14:00","endTime":"18:00"}],
"WED":[{"startTime":"10:00","endTime":"12:00"},{"startTime":"14:00","endTime":"18:00"}],
"THU":[{"startTime":"10:00","endTime":"12:00"},{"startTime":"14:00","endTime":"19:00"}],
"FRI":[{"startTime":"10:00","endTime":"12:00"},{"startTime":"14:00","endTime":"18:00"}],
"SAT":[{"startTime":"10:00","endTime":"12:00"},{"startTime":"14:00","endTime":"18:00"}],
"SUN":[{"startTime":"10:00","endTime":"12:00"},{"startTime":"14:00","endTime":"18:00"}]}'
::jsonb
as timings
),
current_timings as 
(select jsonb_array_elements(timings -> to_char(now(), substring( To_Char(now(), 'DAY'), 0,4))) as timings, substring( To_Char(now(), 'DAY'), 0,4) as day_of_week, now()::time as time_at_moment
from json_d),
availability as (
select time_at_moment >= (timings ->> 'startTime')::time and time_at_moment <= (timings ->> 'endTime')::time as is_available, *
from current_timings
)
select bool_or(is_available)  from availability

select ST_DWITHIN(point, booking_coordinates, MIN(max_ser_radius, max_radius))

iteration1 = 
`select * from mw_geospatials 
where 
ST_DWITHIN(point, booking_coordinates, MIN(max_ser_radius, max_radius)) 
and 
ratings -> overall_ratings > '$overall_ratings' 
and 
emoji-tracker_selected_sub_categories @> '$selected_sub_categories'
and work_mode is on
order by ST_DWITHIN(point, booking_coordinates, MIN(max_ser_radius, max_radius))
limit $page_count `

if(iteration1.count<page_count){
    //in the first variant 
    `select * from mw_geospatials 
where 
ST_DWITHIN(point, booking_coordinates, MIN(max_ser_radius, max_radius)) 
and 
ratings -> overall_ratings > '$overall_ratings' 
and 
emoji-tracker_selected_sub_categories  contains any of '$selected_sub_categories'
and work_mode is on
order by ST_DWITHIN(point, booking_coordinates, MIN(max_ser_radius, max_radius))
limit $(iteration1_count-page_count)`
}