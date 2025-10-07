import java.io.*;
import java.net.*;
import java.util.Scanner;

public class Client {
    public static void main(String[] args) throws IOException {
        Scanner input = new Scanner(System.in);
        int port = 4000;

        System.out.print("Inserisci l'indirizzo del server (solo l'ultima cifra, es. '12' per 192.168.4.12): ");
        String mmm = input.nextLine();

        while (true) {
            System.out.println("Inserisci il messaggio da inviare (digita 'EOF' per terminare l'inserimento):");

            StringBuilder message = new StringBuilder();
            while (true) {
                String line = input.nextLine();
                if (line.equalsIgnoreCase("EOF")) {
                    break;
                }
                message.append(line).append("\n");
            }

            Socket s = new Socket("192.168.4." + mmm, port);
            OutputStreamWriter osw = new OutputStreamWriter(s.getOutputStream());
            BufferedWriter bw = new BufferedWriter(osw);
            PrintWriter out = new PrintWriter(bw, true);

            out.println(message.toString().trim());  // Rimuove l’ultima newline
            s.close();
        }
    }
}
