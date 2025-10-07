import java.io.*;
import java.net.*;
import java.util.Scanner;

public class Client {
    public static void main(String[] args) throws IOException {
        Scanner input = new Scanner(System.in);
        int port = 4000;
        String mmm = "";  // variabile per l'ultima cifra IP

        while (true) {
            System.out.print("Inserisci l'indirizzo del server (solo l'ultima cifra, es. '12' per 192.168.4.12) [Invio per mantenere " + (mmm.isEmpty() ? "nessuno" : mmm) + "]: ");
            String newMmm = input.nextLine();

            if (!newMmm.trim().isEmpty()) {
                mmm = newMmm.trim();
            }

            if (mmm.isEmpty()) {
                System.out.println("Devi inserire un indirizzo valido!");
                continue;  // ripeti la richiesta se non hai un IP
            }

            System.out.println("Inserisci il messaggio da inviare (digita 'EOF' per terminare l'inserimento):");

            StringBuilder message = new StringBuilder();
            while (true) {
                String line = input.nextLine();
                if (line.equalsIgnoreCase("EOF")) {
                    break;
                }
                message.append(line).append("\n");
            }

            try (Socket s = new Socket("192.168.4." + mmm, port);
                 PrintWriter out = new PrintWriter(new BufferedWriter(new OutputStreamWriter(s.getOutputStream())), true)) {

                out.println(message.toString().trim());  // Rimuove l’ultima newline
                System.out.println("Messaggio inviato a 192.168.4." + mmm);
            } catch (IOException e) {
                System.out.println("Errore di connessione: " + e.getMessage());
            }
        }
    }
}