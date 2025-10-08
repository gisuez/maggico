import java.io.*;
import java.net.*;
import java.util.*;

public class Client {
    public static void main(String[] args) throws IOException {
        Scanner input = new Scanner(System.in);
        int port = 4000;

        while (true) {
            System.out.print("Inserisci le ultime cifre degli indirizzi dei server separate da spazi o virgole (es. '12 15 18') [Invio per mantenere quelli precedenti]: ");
            String line = input.nextLine().trim();

            // Lista per memorizzare le ultime cifre degli IP
            List<String> servers = new ArrayList<>();

            if (!line.isEmpty()) {
                // Split per spazi o virgole
                String[] parts = line.split("[,\\s]+");
                for (String part : parts) {
                    if (!part.isEmpty()) {
                        servers.add(part);
                    }
                }
            }

            if (servers.isEmpty()) {
                System.out.println("Devi inserire almeno un indirizzo valido!");
                continue;
            }

            System.out.println("Inserisci il messaggio da inviare (digita 'EOF' per terminare l'inserimento):");

            StringBuilder message = new StringBuilder();
            while (true) {
                String msgLine = input.nextLine();
                if (msgLine.equalsIgnoreCase("EOF")) {
                    break;
                }
                message.append(msgLine).append("\n");
            }

            String msgToSend = message.toString().trim();

            for (String mmm : servers) {
                try (Socket s = new Socket("192.168." + mmm, port);
                     PrintWriter out = new PrintWriter(new BufferedWriter(new OutputStreamWriter(s.getOutputStream())), true)) {

                    out.println(msgToSend);
                    System.out.println("Messaggio inviato a 192.168." + mmm);
                } catch (IOException e) {
                    System.out.println("Errore di connessione a 192.168." + mmm + ": " + e.getMessage());
                }
            }
        }
    }
}
