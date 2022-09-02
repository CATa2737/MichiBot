#include <iostream>
#include <string>
#include <stdio.h>
#include <unistd.h>
#include <cstdlib>

#define ANSI_COLOR_RED     "\x1b[31m"
#define ANSI_COLOR_GREEN   "\x1b[32m"
#define ANSI_COLOR_YELLOW  "\x1b[33m"
#define ANSI_COLOR_BLUE    "\x1b[34m"
#define ANSI_COLOR_MAGENTA "\x1b[35m"
#define ANSI_COLOR_CYAN    "\x1b[36m"
#define ANSI_COLOR_RESET   "\x1b[0m"
#define msg(s) printf(ANSI_COLOR_BLUE "==> " ANSI_COLOR_RESET "%s\n", s)

int main() {
  int inDiscordBot = 0;

  char* tmp = get_current_dir_name();
  std::string s(tmp);

  s.find("MichiBot") != std::string::npos ?
    inDiscordBot = 1 : 
    inDiscordBot = 0;

  if (!inDiscordBot) {
    msg("No me encuentro en la carpeta 'MichiBot'");
    exit(1);
  }

  msg("Instalando paquetes.");
  system("npm i");
  msg("Inicia el codigo con npm start");
}
