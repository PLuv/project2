import time
import datetime

def current_time():
    ts = time.time()
    # Convert to eastern
    ts += (4 * -3600)
    st = datetime.datetime.fromtimestamp(ts)
    return (st)
