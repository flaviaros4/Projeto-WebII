package com.maintech.backend.service;

import com.maintech.backend.model.*;
import com.maintech.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private CategoriaEquipamentoRepository categoriaRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private SolicitacaoRepository solicitacaoRepository;

    @Autowired
    private HistoricoSolicitacaoRepository historicoRepository;

    @Override
    public void run(String... args) throws Exception {
        System.out.println(" Iniciando carga de dados...");

        // 1. Criar categorias se não existirem
        criarCategorias();

        // 2. Criar funcionários se não existirem
        criarFuncionarios();

        // 3. Criar clientes de teste se não existirem
        criarClientesTeste();

        // 4. Criar solicitações de teste
        criarSolicitacoesDeTeste();

        System.out.println(" Carga de dados concluída!");
    }

    private void criarCategorias() {
        if (categoriaRepository.count() == 0) {
            System.out.println(" Criando categorias de teste...");

            // Adicionando Monitor para completar as 5 do PDF + 1 extra
            String[] categorias = {"Notebook", "Desktop", "Impressora", "Mouse", "Teclado", "Monitor"};

            for (String nomeCategoria : categorias) {
                CategoriaEquipamento categoria = new CategoriaEquipamento();
                categoria.setNome(nomeCategoria);
                categoria.setStatus(true);
                categoriaRepository.save(categoria);
            }

            System.out.println(" " + categorias.length + " categorias criadas!");
        } else {
            System.out.println("ℹ  Categorias já existem no banco");
        }
    }

    private void criarFuncionarios() {
        if (funcionarioRepository.count() == 0) {
            System.out.println("Criando funcionários de teste...");

            // Funcionário 1 - Maria
            Funcionario maria = new Funcionario();
            maria.setNome("Maria Silva");
            maria.setEmail("maria@maintech.com");
            maria.setSenha(passwordEncoder.encode("1234")); // Senha criptografada
            maria.setPerfil(Perfil.FUNCIONARIO);
            maria.setStatus(true);
            maria.setDataNascimento(java.time.LocalDate.of(1990, 5, 15));
            funcionarioRepository.save(maria);

            // Funcionário 2 - Mário
            Funcionario mario = new Funcionario();
            mario.setNome("Mário Souza");
            mario.setEmail("mario@maintech.com");
            mario.setSenha(passwordEncoder.encode("1234")); // Senha criptografada
            mario.setPerfil(Perfil.FUNCIONARIO);
            mario.setStatus(true);
            mario.setDataNascimento(java.time.LocalDate.of(1985, 8, 20));
            funcionarioRepository.save(mario);

            System.out.println(" 2 funcionários criados!");
        } else {
            System.out.println("ℹ  Funcionários já existem no banco");
        }
    }

    private void criarClientesTeste() {
        if (clienteRepository.count() == 0) {
            System.out.println("Criando clientes de teste...");

            // Cliente 1 - João
            Cliente joao = new Cliente();
            joao.setNome("João Silva");
            joao.setEmail("joao@email.com");
            joao.setSenha(passwordEncoder.encode("1234")); // Senha criptografada
            joao.setPerfil(Perfil.CLIENTE);
            joao.setStatus(true);
            joao.setCpf("123.456.789-00");
            joao.setTelefone("(41) 99999-9999");
            Endereco end1 = new Endereco();
            end1.setCep("80000-000");
            end1.setLogradouro("Rua das Flores");
            end1.setNumero("123");
            end1.setBairro("Centro");
            end1.setCidade("Curitiba");
            end1.setEstado("PR");
            joao.setEndereco(end1);
            clienteRepository.save(joao);

            // Cliente 2 - José
            Cliente jose = new Cliente();
            jose.setNome("José Santos");
            jose.setEmail("jose@email.com");
            jose.setSenha(passwordEncoder.encode("1234"));
            jose.setPerfil(Perfil.CLIENTE);
            jose.setStatus(true);
            jose.setCpf("111.222.333-44");
            jose.setTelefone("(41) 98888-8888");
            Endereco end2 = new Endereco();
            end2.setCep("81000-000");
            end2.setLogradouro("Rua das Pedras");
            end2.setNumero("456");
            end2.setBairro("Portão");
            end2.setCidade("Curitiba");
            end2.setEstado("PR");
            jose.setEndereco(end2);
            clienteRepository.save(jose);

            // Cliente 3 - Joana
            Cliente joana = new Cliente();
            joana.setNome("Joana Pereira");
            joana.setEmail("joana@email.com");
            joana.setSenha(passwordEncoder.encode("1234"));
            joana.setPerfil(Perfil.CLIENTE);
            joana.setStatus(true);
            joana.setCpf("444.555.666-77");
            joana.setTelefone("(41) 97777-7777");
            Endereco end3 = new Endereco();
            end3.setCep("82000-000");
            end3.setLogradouro("Av. Principal");
            end3.setNumero("789");
            end3.setBairro("Santa Felicidade");
            end3.setCidade("Curitiba");
            end3.setEstado("PR");
            joana.setEndereco(end3);
            clienteRepository.save(joana);

            // Cliente 4 - Joaquina
            Cliente joaquina = new Cliente();
            joaquina.setNome("Joaquina Mendes");
            joaquina.setEmail("joaquina@email.com");
            joaquina.setSenha(passwordEncoder.encode("1234"));
            joaquina.setPerfil(Perfil.CLIENTE);
            joaquina.setStatus(true);
            joaquina.setCpf("777.888.999-00");
            joaquina.setTelefone("(41) 96666-6666");
            Endereco end4 = new Endereco();
            end4.setCep("83000-000");
            end4.setLogradouro("Rua da Lapa");
            end4.setNumero("101");
            end4.setBairro("Centro");
            end4.setCidade("São José dos Pinhais");
            end4.setEstado("PR");
            joaquina.setEndereco(end4);
            clienteRepository.save(joaquina);

            System.out.println("4 clientes de teste criados!");
        } else {
            System.out.println("ℹ  Clientes de teste já existem no banco");
        }
    }

    private void criarEGravarHistorico(Solicitacao solicitacao, EstadoSolicitacao anterior, EstadoSolicitacao nova, Usuario usuario, String obs, LocalDateTime data) {
        HistoricoSolicitacao historico = new HistoricoSolicitacao();
        historico.setSolicitacao(solicitacao);
        historico.setDataHora(data);
        historico.setEstadoAnterior(anterior);
        historico.setEstadoNovo(nova);
        historico.setUsuarioAlteracao(usuario);
        historico.setObservacao(obs);
        historicoRepository.save(historico);
    }

    // Método para criar as 20 solicitações
    private void criarSolicitacoesDeTeste() {
        if (solicitacaoRepository.count() > 0) {
            System.out.println("ℹ  Solicitações de teste já existem no banco");
            return;
        }

        System.out.println(" Criando massa de 20 solicitações de teste...");

        List<Cliente> clientes = clienteRepository.findAll();
        List<Funcionario> funcionarios = funcionarioRepository.findAll();
        List<CategoriaEquipamento> categorias = categoriaRepository.findAll();

        if (clientes.size() < 4 || funcionarios.size() < 2 || categorias.size() < 5) {
            System.err.println("!!! Erro: Clientes, funcionários ou categorias base não encontrados. Abortando criação de solicitações.");
            return;
        }

        Cliente joao = clientes.get(0);
        Cliente jose = clientes.get(1);
        Cliente joana = clientes.get(2);
        Cliente joaquina = clientes.get(3);

        Funcionario maria = funcionarios.get(0);
        Funcionario mario = funcionarios.get(1);

        CategoriaEquipamento notebook = categorias.get(0);
        CategoriaEquipamento desktop = categorias.get(1);
        CategoriaEquipamento impressora = categorias.get(2);
        CategoriaEquipamento mouse = categorias.get(3);
        CategoriaEquipamento teclado = categorias.get(4);

        LocalDateTime agora = LocalDateTime.now();

        // 1. ABERTA (João)
        Solicitacao s1 = new Solicitacao();
        s1.setCliente(joao); s1.setCategoria(notebook);
        s1.setDescricaoEquipamento("Notebook Dell G15"); s1.setDescricaoDefeito("Tela piscando");
        s1.setEstado(EstadoSolicitacao.ABERTA); s1.setDataHoraAbertura(agora.minusDays(1));
        solicitacaoRepository.save(s1);
        criarEGravarHistorico(s1, null, EstadoSolicitacao.ABERTA, joao, "Solicitação criada", s1.getDataHoraAbertura());

        // 2. ABERTA (José)
        Solicitacao s2 = new Solicitacao();
        s2.setCliente(jose); s2.setCategoria(desktop);
        s2.setDescricaoEquipamento("PC Gamer"); s2.setDescricaoDefeito("Não liga");
        s2.setEstado(EstadoSolicitacao.ABERTA); s2.setDataHoraAbertura(agora.minusDays(2));
        solicitacaoRepository.save(s2);
        criarEGravarHistorico(s2, null, EstadoSolicitacao.ABERTA, jose, "Solicitação criada", s2.getDataHoraAbertura());

        // 3. ORÇADA (Joana)
        Solicitacao s3 = new Solicitacao();
        s3.setCliente(joana); s3.setCategoria(impressora);
        s3.setDescricaoEquipamento("HP Deskjet"); s3.setDescricaoDefeito("Não puxa papel");
        s3.setEstado(EstadoSolicitacao.ORÇADA); s3.setDataHoraAbertura(agora.minusDays(3));
        s3.setValorOrcamento(new BigDecimal("120.00")); s3.setFuncionarioOrcamento(maria);
        solicitacaoRepository.save(s3);
        criarEGravarHistorico(s3, null, EstadoSolicitacao.ABERTA, joana, "Solicitação criada", s3.getDataHoraAbertura());
        criarEGravarHistorico(s3, EstadoSolicitacao.ABERTA, EstadoSolicitacao.ORÇADA, maria, "Orçamento de R$ 120.00 realizado por Maria Silva", agora.minusDays(2));

        // 4. APROVADA (Joaquina)
        Solicitacao s4 = new Solicitacao();
        s4.setCliente(joaquina); s4.setCategoria(mouse);
        s4.setDescricaoEquipamento("Mouse Logitech MX Master 3"); s4.setDescricaoDefeito("Botão esquerdo falhando");
        s4.setEstado(EstadoSolicitacao.APROVADA); s4.setDataHoraAbertura(agora.minusDays(5));
        s4.setValorOrcamento(new BigDecimal("80.00")); s4.setFuncionarioOrcamento(mario);
        solicitacaoRepository.save(s4);
        criarEGravarHistorico(s4, null, EstadoSolicitacao.ABERTA, joaquina, "Solicitação criada", s4.getDataHoraAbertura());
        criarEGravarHistorico(s4, EstadoSolicitacao.ABERTA, EstadoSolicitacao.ORÇADA, mario, "Orçamento de R$ 80.00 realizado por Mário Souza", agora.minusDays(4));
        criarEGravarHistorico(s4, EstadoSolicitacao.ORÇADA, EstadoSolicitacao.APROVADA, joaquina, "Orçamento aprovado pelo cliente", agora.minusDays(3));

        // 5. REJEITADA (João)
        Solicitacao s5 = new Solicitacao();
        s5.setCliente(joao); s5.setCategoria(teclado);
        s5.setDescricaoEquipamento("Teclado Mecânico Redragon"); s5.setDescricaoDefeito("Tecla W não funciona");
        s5.setEstado(EstadoSolicitacao.REJEITADA); s5.setDataHoraAbertura(agora.minusDays(6));
        s5.setValorOrcamento(new BigDecimal("150.00")); s5.setFuncionarioOrcamento(maria);
        solicitacaoRepository.save(s5);
        criarEGravarHistorico(s5, null, EstadoSolicitacao.ABERTA, joao, "Solicitação criada", s5.getDataHoraAbertura());
        criarEGravarHistorico(s5, EstadoSolicitacao.ABERTA, EstadoSolicitacao.ORÇADA, maria, "Orçamento de R$ 150.00 realizado por Maria Silva", agora.minusDays(5));
        criarEGravarHistorico(s5, EstadoSolicitacao.ORÇADA, EstadoSolicitacao.REJEITADA, joao, "Orçamento rejeitado. Motivo: Muito caro", agora.minusDays(4));

        // 6. ARRUMADA (José)
        Solicitacao s6 = new Solicitacao();
        s6.setCliente(jose); s6.setCategoria(notebook);
        s6.setDescricaoEquipamento("Macbook Air M1"); s6.setDescricaoDefeito("Derramou café");
        s6.setEstado(EstadoSolicitacao.ARRUMADA); s6.setDataHoraAbertura(agora.minusDays(10));
        s6.setValorOrcamento(new BigDecimal("700.00")); s6.setFuncionarioOrcamento(mario);
        solicitacaoRepository.save(s6);
        criarEGravarHistorico(s6, null, EstadoSolicitacao.ABERTA, jose, "Solicitação criada", agora.minusDays(10));
        criarEGravarHistorico(s6, EstadoSolicitacao.ABERTA, EstadoSolicitacao.ORÇADA, mario, "Orçamento de R$ 700.00 realizado por Mário Souza", agora.minusDays(9));
        criarEGravarHistorico(s6, EstadoSolicitacao.ORÇADA, EstadoSolicitacao.APROVADA, jose, "Orçamento aprovado pelo cliente", agora.minusDays(8));
        criarEGravarHistorico(s6, EstadoSolicitacao.APROVADA, EstadoSolicitacao.ARRUMADA, mario, "Manutenção realizada", agora.minusDays(2));

        // 7. PAGA (Joana)
        Solicitacao s7 = new Solicitacao();
        s7.setCliente(joana); s7.setCategoria(desktop);
        s7.setDescricaoEquipamento("iMac 27"); s7.setDescricaoDefeito("Fonte queimou");
        s7.setEstado(EstadoSolicitacao.PAGA); s7.setDataHoraAbertura(agora.minusDays(15));
        s7.setValorOrcamento(new BigDecimal("450.00")); s7.setFuncionarioOrcamento(maria);
        solicitacaoRepository.save(s7);
        criarEGravarHistorico(s7, null, EstadoSolicitacao.ABERTA, joana, "Solicitação criada", agora.minusDays(15));
        criarEGravarHistorico(s7, EstadoSolicitacao.ABERTA, EstadoSolicitacao.ORÇADA, maria, "Orçamento de R$ 450.00 realizado por Maria Silva", agora.minusDays(14));
        criarEGravarHistorico(s7, EstadoSolicitacao.ORÇADA, EstadoSolicitacao.APROVADA, joana, "Orçamento aprovado pelo cliente", agora.minusDays(13));
        criarEGravarHistorico(s7, EstadoSolicitacao.APROVADA, EstadoSolicitacao.ARRUMADA, maria, "Manutenção realizada", agora.minusDays(5));
        criarEGravarHistorico(s7, EstadoSolicitacao.ARRUMADA, EstadoSolicitacao.PAGA, joana, "Pagamento confirmado", agora.minusDays(1));

        // 8. FINALIZADA (Joaquina)
        Solicitacao s8 = new Solicitacao();
        s8.setCliente(joaquina); s8.setCategoria(impressora);
        s8.setDescricaoEquipamento("Epson L3150"); s8.setDescricaoDefeito("Falha na impressão colorida");
        s8.setEstado(EstadoSolicitacao.FINALIZADA); s8.setDataHoraAbertura(agora.minusDays(20));
        s8.setValorOrcamento(new BigDecimal("180.00")); s8.setFuncionarioOrcamento(mario);
        solicitacaoRepository.save(s8);
        criarEGravarHistorico(s8, null, EstadoSolicitacao.ABERTA, joaquina, "Solicitação criada", agora.minusDays(20));
        criarEGravarHistorico(s8, EstadoSolicitacao.ABERTA, EstadoSolicitacao.ORÇADA, mario, "Orçamento de R$ 180.00 realizado por Mário Souza", agora.minusDays(19));
        criarEGravarHistorico(s8, EstadoSolicitacao.ORÇADA, EstadoSolicitacao.APROVADA, joaquina, "Orçamento aprovado pelo cliente", agora.minusDays(18));
        criarEGravarHistorico(s8, EstadoSolicitacao.APROVADA, EstadoSolicitacao.ARRUMADA, mario, "Manutenção realizada", agora.minusDays(10));
        criarEGravarHistorico(s8, EstadoSolicitacao.ARRUMADA, EstadoSolicitacao.PAGA, joaquina, "Pagamento confirmado", agora.minusDays(5));
        criarEGravarHistorico(s8, EstadoSolicitacao.PAGA, EstadoSolicitacao.FINALIZADA, mario, "Solicitação finalizada", agora.minusDays(2));

        // 9. ABERTA (Joana)
        Solicitacao s9 = new Solicitacao();
        s9.setCliente(joana); s9.setCategoria(teclado);
        s9.setDescricaoEquipamento("Teclado Apple"); s9.setDescricaoDefeito("Bluetooth não conecta");
        s9.setEstado(EstadoSolicitacao.ABERTA); s9.setDataHoraAbertura(agora.minusHours(5));
        solicitacaoRepository.save(s9);
        criarEGravarHistorico(s9, null, EstadoSolicitacao.ABERTA, joana, "Solicitação criada", s9.getDataHoraAbertura());

        // 10. ORÇADA (José)
        Solicitacao s10 = new Solicitacao();
        s10.setCliente(jose); s10.setCategoria(mouse);
        s10.setDescricaoEquipamento("Mouse Multilaser"); s10.setDescricaoDefeito("Scroll pulando");
        s10.setEstado(EstadoSolicitacao.ORÇADA); s10.setDataHoraAbertura(agora.minusDays(4));
        s10.setValorOrcamento(new BigDecimal("50.00")); s10.setFuncionarioOrcamento(mario);
        solicitacaoRepository.save(s10);
        criarEGravarHistorico(s10, null, EstadoSolicitacao.ABERTA, jose, "Solicitação criada", s10.getDataHoraAbertura());
        criarEGravarHistorico(s10, EstadoSolicitacao.ABERTA, EstadoSolicitacao.ORÇADA, mario, "Orçamento de R$ 50.00 realizado por Mário Souza", agora.minusDays(1));

        // 11. APROVADA (João)
        Solicitacao s11 = new Solicitacao();
        s11.setCliente(joao); s11.setCategoria(desktop);
        s11.setDescricaoEquipamento("PC Positivo"); s11.setDescricaoDefeito("Lento, possível vírus");
        s11.setEstado(EstadoSolicitacao.APROVADA); s11.setDataHoraAbertura(agora.minusDays(7));
        s11.setValorOrcamento(new BigDecimal("200.00")); s11.setFuncionarioOrcamento(maria);
        solicitacaoRepository.save(s11);
        criarEGravarHistorico(s11, null, EstadoSolicitacao.ABERTA, joao, "Solicitação criada", s11.getDataHoraAbertura());
        criarEGravarHistorico(s11, EstadoSolicitacao.ABERTA, EstadoSolicitacao.ORÇADA, maria, "Orçamento de R$ 200.00 realizado por Maria Silva", agora.minusDays(6));
        criarEGravarHistorico(s11, EstadoSolicitacao.ORÇADA, EstadoSolicitacao.APROVADA, joao, "Orçamento aprovado pelo cliente", agora.minusDays(5));

        // 12. ABERTA (Joaquina)
        Solicitacao s12 = new Solicitacao();
        s12.setCliente(joaquina); s12.setCategoria(notebook);
        s12.setDescricaoEquipamento("Samsung Galaxy Book"); s12.setDescricaoDefeito("Dobradiça quebrada");
        s12.setEstado(EstadoSolicitacao.ABERTA); s12.setDataHoraAbertura(agora.minusHours(2));
        solicitacaoRepository.save(s12);
        criarEGravarHistorico(s12, null, EstadoSolicitacao.ABERTA, joaquina, "Solicitação criada", s12.getDataHoraAbertura());

        // 13. ABERTA (João)
        Solicitacao s13 = new Solicitacao();
        s13.setCliente(joao); s13.setCategoria(impressora);
        s13.setDescricaoEquipamento("Canon PIXMA"); s13.setDescricaoDefeito("Atolando papel");
        s13.setEstado(EstadoSolicitacao.ABERTA); s13.setDataHoraAbertura(agora.minusDays(1));
        solicitacaoRepository.save(s13);
        criarEGravarHistorico(s13, null, EstadoSolicitacao.ABERTA, joao, "Solicitação criada", s13.getDataHoraAbertura());

        // 14. ORÇADA (Joana)
        Solicitacao s14 = new Solicitacao();
        s14.setCliente(joana); s14.setCategoria(notebook);
        s14.setDescricaoEquipamento("Acer Aspire 5"); s14.setDescricaoDefeito("Bateria não segura carga");
        s14.setEstado(EstadoSolicitacao.ORÇADA); s14.setDataHoraAbertura(agora.minusDays(2));
        s14.setValorOrcamento(new BigDecimal("280.00")); s14.setFuncionarioOrcamento(maria);
        solicitacaoRepository.save(s14);
        criarEGravarHistorico(s14, null, EstadoSolicitacao.ABERTA, joana, "Solicitação criada", s14.getDataHoraAbertura());
        criarEGravarHistorico(s14, EstadoSolicitacao.ABERTA, EstadoSolicitacao.ORÇADA, maria, "Orçamento de R$ 280.00 realizado por Maria Silva", agora.minusDays(1));

        // 15. REJEITADA (José)
        Solicitacao s15 = new Solicitacao();
        s15.setCliente(jose); s15.setCategoria(teclado);
        s15.setDescricaoEquipamento("Teclado genérico"); s15.setDescricaoDefeito("Água derramada");
        s15.setEstado(EstadoSolicitacao.REJEITADA); s15.setDataHoraAbertura(agora.minusDays(8));
        s15.setValorOrcamento(new BigDecimal("70.00")); s15.setFuncionarioOrcamento(mario);
        solicitacaoRepository.save(s15);
        criarEGravarHistorico(s15, null, EstadoSolicitacao.ABERTA, jose, "Solicitação criada", s15.getDataHoraAbertura());
        criarEGravarHistorico(s15, EstadoSolicitacao.ABERTA, EstadoSolicitacao.ORÇADA, mario, "Orçamento de R$ 70.00 realizado por Mário Souza", agora.minusDays(7));
        criarEGravarHistorico(s15, EstadoSolicitacao.ORÇADA, EstadoSolicitacao.REJEITADA, jose, "Orçamento rejeitado. Motivo: Não compensa", agora.minusDays(6));

        // 16. ABERTA (Joaquina)
        Solicitacao s16 = new Solicitacao();
        s16.setCliente(joaquina); s16.setCategoria(mouse);
        s16.setDescricaoEquipamento("Mouse Fortrek"); s16.setDescricaoDefeito("Cabo USB com mau contato");
        s16.setEstado(EstadoSolicitacao.ABERTA); s16.setDataHoraAbertura(agora.minusDays(1));
        solicitacaoRepository.save(s16);
        criarEGravarHistorico(s16, null, EstadoSolicitacao.ABERTA, joaquina, "Solicitação criada", s16.getDataHoraAbertura());

        // 17. FINALIZADA (João)
        Solicitacao s17 = new Solicitacao();
        s17.setCliente(joao); s17.setCategoria(desktop);
        s17.setDescricaoEquipamento("Desktop Dell Optiplex"); s17.setDescricaoDefeito("Formatação e limpeza");
        s17.setEstado(EstadoSolicitacao.FINALIZADA); s17.setDataHoraAbertura(agora.minusDays(30));
        s17.setValorOrcamento(new BigDecimal("150.00")); s17.setFuncionarioOrcamento(maria);
        solicitacaoRepository.save(s17);
        criarEGravarHistorico(s17, null, EstadoSolicitacao.ABERTA, joao, "Solicitação criada", agora.minusDays(30));
        criarEGravarHistorico(s17, EstadoSolicitacao.ABERTA, EstadoSolicitacao.ORÇADA, maria, "Orçamento de R$ 150.00 realizado por Maria Silva", agora.minusDays(29));
        criarEGravarHistorico(s17, EstadoSolicitacao.ORÇADA, EstadoSolicitacao.APROVADA, joao, "Orçamento aprovado pelo cliente", agora.minusDays(28));
        criarEGravarHistorico(s17, EstadoSolicitacao.APROVADA, EstadoSolicitacao.ARRUMADA, maria, "Manutenção realizada", agora.minusDays(25));
        criarEGravarHistorico(s17, EstadoSolicitacao.ARRUMADA, EstadoSolicitacao.PAGA, joao, "Pagamento confirmado", agora.minusDays(20));
        criarEGravarHistorico(s17, EstadoSolicitacao.PAGA, EstadoSolicitacao.FINALIZADA, maria, "Solicitação finalizada", agora.minusDays(19));

        // 18. ARRUMADA (Joana)
        Solicitacao s18 = new Solicitacao();
        s18.setCliente(joana); s18.setCategoria(notebook);
        s18.setDescricaoEquipamento("HP Pavilion"); s18.setDescricaoDefeito("Upgrade de SSD");
        s18.setEstado(EstadoSolicitacao.ARRUMADA); s18.setDataHoraAbertura(agora.minusDays(9));
        s18.setValorOrcamento(new BigDecimal("350.00")); s18.setFuncionarioOrcamento(mario);
        solicitacaoRepository.save(s18);
        criarEGravarHistorico(s18, null, EstadoSolicitacao.ABERTA, joana, "Solicitação criada", agora.minusDays(9));
        criarEGravarHistorico(s18, EstadoSolicitacao.ABERTA, EstadoSolicitacao.ORÇADA, mario, "Orçamento de R$ 350.00 realizado por Mário Souza", agora.minusDays(8));
        criarEGravarHistorico(s18, EstadoSolicitacao.ORÇADA, EstadoSolicitacao.APROVADA, joana, "Orçamento aprovado pelo cliente", agora.minusDays(7));
        criarEGravarHistorico(s18, EstadoSolicitacao.APROVADA, EstadoSolicitacao.ARRUMADA, mario, "Manutenção realizada", agora.minusDays(1));

        // 19. ABERTA (José)
        Solicitacao s19 = new Solicitacao();
        s19.setCliente(jose); s19.setCategoria(impressora);
        s19.setDescricaoEquipamento("Brother Laser"); s19.setDescricaoDefeito("Mancha na impressão");
        s19.setEstado(EstadoSolicitacao.ABERTA); s19.setDataHoraAbertura(agora.minusHours(8));
        solicitacaoRepository.save(s19);
        criarEGravarHistorico(s19, null, EstadoSolicitacao.ABERTA, jose, "Solicitação criada", s19.getDataHoraAbertura());

        // 20. ORÇADA (Joaquina)
        Solicitacao s20 = new Solicitacao();
        s20.setCliente(joaquina); s20.setCategoria(desktop);
        s20.setDescricaoEquipamento("Computador de escritório"); s20.setDescricaoDefeito("Porta USB não funciona");
        s20.setEstado(EstadoSolicitacao.ORÇADA); s20.setDataHoraAbertura(agora.minusDays(3));
        s20.setValorOrcamento(new BigDecimal("90.00")); s20.setFuncionarioOrcamento(maria);
        solicitacaoRepository.save(s20);
        criarEGravarHistorico(s20, null, EstadoSolicitacao.ABERTA, joaquina, "Solicitação criada", s20.getDataHoraAbertura());
        criarEGravarHistorico(s20, EstadoSolicitacao.ABERTA, EstadoSolicitacao.ORÇADA, maria, "Orçamento de R$ 90.00 realizado por Maria Silva", agora.minusDays(2));

        System.out.println(" 20 solicitações de teste criadas!");
    }
}