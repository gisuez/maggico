import java.net.*;
import java.io.*;

public class Server {
    public static void main(String args[]) throws IOException {
        int port = 4000;
        ServerSocket ss = new ServerSocket(port);
        System.out.println("Server in ascolto sulla porta " + port);

        while (true) {
            Socket s = ss.accept();

            InputStreamReader isr = new InputStreamReader(s.getInputStream());
            BufferedReader in = new BufferedReader(isr);

            String line;
            System.out.println("Messaggio da " + s.getInetAddress() + ":");
            while ((line = in.readLine()) != null) {
                System.out.println(line);
            }

            s.close();
            System.out.println("Connessione chiusa.\n");
        }
    }
}
