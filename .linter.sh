#!/bin/bash
cd /home/kavia/workspace/code-generation/quizrush-the-ultimate-trivia-challenge-95216-95230/main_container_for_quizrush
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

