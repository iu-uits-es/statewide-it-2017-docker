#!/bin/bash

# I kill session if already exists 2>/dev/null
tmux kill-session -t demosession 2>/dev/null

# Then start a new session not attatched to the current terminal
tmux new-session  -s demosession -d -n demo bash

tmux set -g status off

# Then I will open 2 terminals attached to that session: one is full screen with
# big fonts, for the beamer, and one is smaller for my laptop to see that I do.
# I'm on cygwin and use 'mintty'. Each one attatches to the same session: what you
# type on one is seen in both.

#tmux send -t demosession "alias dockert='winpty docker'" Enter
#tmux send -t demosession "alias dockert-machine='winpty docker-machine'" Enter
tmux send -t demosession "alias pwd='cygpath -am .'" Enter
tmux send-keys -t demosession clear Enter && tmux clear-history

# the one to show on the beamer is called 'DEMO'
mintty -p 0,0 -s 145,45 -o FontHeight=15 -t "DEMO $(date +%d.%m.%Y) - tmux - " tmux attach-session -t demosession &

# mine is called 'presenter'
mintty -p 0,0  -s 145,45 -o FontHeight=11 -t presenter tmux attach-session -t demosession &

sleep 1
