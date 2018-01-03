import zerorpc
from time import sleep
from RPIO import PWM

class RpcConnect(object):
    def __init__(self):
        
        PWM.setup()
        PWM.set_loglevel(PWM.LOG_LEVEL_ERRORS)
        PWM.init_channel(0)
        self.num = {
                0:(1,1,1,1,1,1,0),
                1:(0,1,1,0,0,0,0),
                2:(1,1,0,1,1,0,1),
                3:(1,1,1,1,0,0,1),
                4:(0,1,1,0,0,1,1),
                5:(1,0,1,1,0,1,1),
                6:(1,0,1,1,1,1,1),
                7:(1,1,1,0,0,0,0),
                8:(1,1,1,1,1,1,1),
                9:(1,1,1,1,0,1,1)}

        self.pulse = {
                0:4,
                1:999}
        PWM.add_channel_pulse(0, 20, 0, 999)
        PWM.add_channel_pulse(0, 21, 1000, 999)


    def SetDual7Seg(self,value):
        # Split passed value into separate digit integer list
        digits = map(int, "%02d" % value)
        
        # Set pulses for segments A-G (both digits) 
        for i in range(7):
            PWM.add_channel_pulse(0, 10 + i, 0, self.pulse[self.num[digits[0]][i]])
            PWM.add_channel_pulse(0, 10 + i, 1000, self.pulse[self.num[digits[1]][i]])

    def Close(self):
        PWM.clear_channel(0)
        PWM.cleanup()

print "running"
s=zerorpc.Server(RpcConnect())
s.bind("tcp://0.0.0.0:4242")
s.run()        
        

        
        
