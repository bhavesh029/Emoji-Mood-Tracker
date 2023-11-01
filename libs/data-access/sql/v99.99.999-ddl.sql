\c $db;
set schema '$schema';

DO $$
DECLARE
    t text;
BEGIN
    FOR t IN
        SELECT table_name FROM information_schema.columns WHERE column_name = 'updated_timestamp'
    LOOP
        EXECUTE format('CREATE OR REPLACE TRIGGER trigger_update_timestamp
                    BEFORE UPDATE ON $schema.%I
                    FOR EACH ROW EXECUTE PROCEDURE mw_update_updated_timestamp_task()', t,t);
    END loop;
END;
$$ language 'plpgsql';