
import time
start=time.time()
for i in range(500000000):
    x=1

end=time.time()
print("elapsed")
elapsed=(end-start)
print(elapsed)
print(1/0)
print("finished")