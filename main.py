

def resume_campaign():
  print 'DND Campaign Manager'
  command_loop()

def command_loop():
  command = raw_input('>> ')
  print command
  command_loop()

resume_campaign()
